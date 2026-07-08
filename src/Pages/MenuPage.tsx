import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "../axiosInstance";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoriesBar from "../components/Menu/CategoriesBar";

interface ItemType {
  id: string;
  name: string;
  nameAr?: string | null;
  description?: string;
  descriptionAr?: string | null;
  // The menu payload no longer inlines base64 images. `hasImage` says whether
  // to build an <img> URL; `updatedAt` versions that URL for cache-busting.
  hasImage?: boolean;
  updatedAt?: string;
  price: number;
  category?: { id: string; name: string; orderNumber?: number };
}

/**
 * Pick the right localized field for an item.
 *
 * The old design tried to translate names/descriptions through the
 * generic Translation table, keyed by source text. Two items sharing
 * the same English text (or identical name+description on one item)
 * collided and the description value clobbered the name value.
 *
 * Now Arabic strings live on the Item row itself; this helper picks
 * the right one based on the active i18n language, falling back to
 * the base value when no Arabic variant is set.
 */
const pickLocalized = (
  lang: string,
  base: string | undefined | null,
  ar: string | undefined | null,
) => {
  if (lang === 'ar' && ar && ar.trim()) return ar;
  return base ?? '';
};

interface DealType {
  id: string;
  title: string;
  description: string;
  discount?: number;
  hasImage?: boolean;
  updatedAt?: string;
}

// Categories state is handled inside the extracted component

// The API no longer inlines base64 images in the menu payload; each image is
// fetched from its own cacheable endpoint. Build those URLs against the API
// origin (the same host axios talks to), versioned by the row's updatedAt so a
// changed image busts the browser's otherwise-immutable cache.
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

const buildImageUrl = (
  kind: 'item' | 'deal',
  id: string,
  updatedAt?: string,
  size: 'thumb' | 'full' = 'thumb',
) => {
  const v = updatedAt ? `&v=${encodeURIComponent(updatedAt)}` : '';
  return `${API_BASE}/${kind}/image/${id}?size=${size}${v}`;
};

const fetchItemsPage = async (categoryId: string, pageParam: number) => {
  const response = await axios.get(
    `/item/public?page=${pageParam}&restaurantId=${localStorage.getItem(
      "RestaurantID"
    )}&categoryId=${categoryId}`
  );
  return response.data;
};

const fetchDeals = async () => {
  const response = await axios.get(
    `/deal/public?restaurantId=${localStorage.getItem("RestaurantID")}`
  );
  return response.data.items;
};

const MenuPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const {
    data: itemsData,
    isPending: isItemsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["items", selectedCategory],
    queryFn: ({ pageParam = 1 }) =>
      fetchItemsPage(selectedCategory!, pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    enabled: !!selectedCategory,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
  });

  const items: ItemType[] = useMemo(
    () => itemsData?.pages.flatMap((p: any) => p.items) ?? [],
    [itemsData]
  );

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, selectedCategory]);

  const { data: deals = [], isPending: isDealsLoading } = useQuery({
    queryKey: ["deals"],
    queryFn: fetchDeals,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  // Initial category is provided by CategoriesBar via onCategoryChange

  const handleCategoryClick = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  // Filter items based on search term — search across BOTH languages so
  // typing the Arabic word matches items that only have an English name.
  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item: ItemType) => {
      const haystack = [
        item.name,
        item.nameAr,
        item.description,
        item.descriptionAr,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [items, searchTerm]);



  // Category scroll and pagination are managed inside CategoriesBar

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Deals Carousel */}
      {deals.length > 0 && (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">{t("Special Deals")}</h2>
          <Carousel
            className="w-full rounded-xl"
            opts={{ loop: true, align: "center" }}
          >
            <CarouselContent>
              {deals.map((deal: DealType) => (
                <CarouselItem key={deal.id} className="basis-full">
                  <div className="relative">
                    <Card className="overflow-hidden rounded-xl shadow-sm">
                      <CardContent className="p-0">
                        {deal.hasImage && (
                          <img
                            src={buildImageUrl('deal', deal.id, deal.updatedAt, 'full')}
                            alt={t(deal.title)}
                            className="w-full h-64 md:h-72 object-cover"
                            loading="lazy"
                            decoding="async"
                            sizes="100vw"
                          />
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                          <h3 className="text-xl font-semibold mb-1">
                            {t(deal.title)}
                          </h3>
                          <p className="text-sm opacity-90">{t(deal.description)}</p>
                        </div>
                        {deal.discount && (
                          <div className="absolute top-4 right-4 bg-red-600/95 backdrop-blur text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                            {deal.discount}% OFF
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
      <div className="sticky top-0 z-20 p-4 backdrop-blur bg-background/80 border-b">
        {/* Search bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("Search items...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full pl-9"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              inputMode="search"
            />
          </div>
        </div>

        {/* Categories handled in standalone component */}
        <CategoriesBar onCategoryChange={(id) => setSelectedCategory(id)} />
      </div>

      {/* Items grid */}
      <div className="flex-grow overflow-y-auto p-4">
        {!selectedCategory ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <Search className="h-10 w-10 mb-3 opacity-60" />
            <p className="text-sm md:text-base">{t("Please select a category to view items.")}</p>
          </div>
        ) : isItemsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Render skeletons when items are loading */}
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="shadow-sm animate-pulse">
                <CardHeader>
                  <Skeleton className="w-full aspect-video rounded-lg" />
                  <Skeleton className="h-6 w-3/4 mt-3" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardFooter>
                  <Skeleton className="h-5 w-1/4" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item: ItemType) => {
              const localName = pickLocalized(lang, item.name, item.nameAr);
              const localDesc = pickLocalized(lang, item.description, item.descriptionAr);
              return (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="relative">
                        {item.hasImage && (
                          <img
                            src={buildImageUrl('item', item.id, item.updatedAt, 'thumb')}
                            alt={localName}
                            className="w-full aspect-video object-cover"
                            loading="lazy"
                            decoding="async"
                            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                          />
                        )}
                        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-2.5 py-1 rounded-full text-sm font-semibold text-primary border">
                          {t("IQD")} {item.price.toLocaleString()}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-base md:text-lg font-semibold tracking-tight">
                          {localName}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                          {localDesc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{localName}</DialogTitle>
                      <DialogDescription className="text-sm text-gray-500">
                        {localDesc}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="p-4">
                      {item.hasImage && (
                        <img
                          src={buildImageUrl('item', item.id, item.updatedAt, 'full')}
                          alt={localName}
                          className="w-full object-cover rounded-lg mb-4"
                          style={{ maxHeight: "60vh" }}
                          loading="lazy"
                          decoding="async"
                          sizes="100vw"
                        />
                      )}
                      <p className="text-lg font-bold text-primary mb-2">
                        {t("IQD")} {item.price.toLocaleString()}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        ) : (
          // Show a message when no items match the search
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <Search className="h-10 w-10 mb-3 opacity-60" />
            <p className="text-sm md:text-base">{t("No items found matching your search.")}</p>
          </div>
        )}
        <div ref={sentinelRef} />
        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-6">
            <Skeleton className="h-6 w-24" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
