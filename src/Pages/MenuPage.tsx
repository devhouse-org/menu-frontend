import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getThemeColors } from "@/utils";
import { iconOptions } from "@/utils/data";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "../axiosInstance";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card";

interface CategoryType {
  id: string;
  name: string;
  icon?: string;
}

interface ItemType {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
}

interface DealType {
  id: string;
  title: string;
  description: string;
  discount?: number;
  image?: string;
}

const fetchCategories = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `/category?page=${pageParam}&restaurantId=${localStorage.getItem(
      "RestaurantID"
    )}`
  );
  return response.data;
};

const fetchItems = async (categoryId: string) => {
  const response = await axios.get(`/category/${categoryId}`);
  return response.data.items;
};

const fetchDeals = async () => {
  const response = await axios.get(
    `/deal?restaurantId=${localStorage.getItem("RestaurantID")}&published=true`
  );
  return response.data.items;
};

const MenuPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const theme = getThemeColors();
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {
    data: categoriesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  // Flatten categories data from all pages
  const categories = categoriesData?.pages.flatMap((page) => page.items) ?? [];

  // Handle scroll to check if we're near the end
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    let isNearEnd = null;

    if (i18n.language === "ar") {
      // For Arabic, check if we're near the right edge since scrollLeft will be negative
      isNearEnd =
        Math.abs(container.scrollLeft) + container.clientWidth >=
        container.scrollWidth - 20;
    } else {
      // For LTR languages, check if we're near the right edge
      isNearEnd =
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 20;
    }

    if (isNearEnd && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const { data: items = [], isPending: isItemsLoading } = useQuery({
    queryKey: ["items", selectedCategory],
    queryFn: () => fetchItems(selectedCategory!),
    enabled: !!selectedCategory,
  });

  const { data: deals = [], isPending: isDealsLoading } = useQuery({
    queryKey: ["deals"],
    queryFn: fetchDeals,
  });

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const button = categoryRefs.current[categoryId];
    if (button && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const scrollLeft =
        button.offsetLeft -
        scrollContainer.offsetWidth / 2 +
        button.offsetWidth / 2;
      scrollContainer.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  // New function to filter items based on search term
  const filteredItems = items.filter(
    (item: ItemType) =>
      t(item.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(item.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const getIconComponent = (iconName?: string) => {
    if (!iconName) return null;
    const icon = iconOptions.find(
      (option: { title: string; value: any }) => option.title === iconName
    );
    return icon ? icon.value : null;
  };
  // Add a new useEffect to check for scroll possibility
  useEffect(() => {
    const checkForScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      // If there's no horizontal scroll and we have more pages to load
      if (
        container.scrollWidth <= container.clientWidth &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    // Check initially and after any window resize
    checkForScroll();
    window.addEventListener("resize", checkForScroll);

    // Cleanup
    return () => window.removeEventListener("resize", checkForScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, categoriesData]);

  return (  
      <div className="flex relative flex-col p-3 h-full rounded-full">
        {/* Backdrop tinted with primary color */}
        <div
          className="absolute inset-0 rounded-sm opacity-10 pointer-events-none -z-10"
          style={{ backgroundColor: theme.primary }}
        />
        {/* Mercury parent wrapper */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient( ${theme.primary}14, transparent 60%), radial-gradient( ${theme.primary}10, transparent 60%)`,
          }}
        />
        {/* Deals Carousel */}
        {(isDealsLoading || deals.length > 0) && (
          <div className="p-3">
            <div className="p-3 rounded-2xl ring-1 shadow-md backdrop-blur-md ring-white/10">
              <h2 className="mb-3 text-lg font-semibold">
                {t("Special Deals")}
              </h2>
              <Carousel
                className="w-full rounded-xl"
                opts={{ loop: true, align: "center" }}
              >
                <CarouselContent>
                  {isDealsLoading
                    ? Array.from({ length: 2 }).map((_, idx) => (
                        <CarouselItem key={idx} className="basis-full">
                          <Card className="overflow-hidden rounded-xl ring-1 ring-black/5 bg-background/60">
                            <CardContent className="p-0">
                              <Skeleton className="w-full h-48" />
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))
                    : deals.map((deal: DealType) => (
                        <CarouselItem key={deal.id} className="basis-full">
                          <div className="relative">
                            <Card className="overflow-hidden rounded-xl ring-1 shadow-md ring-black/5 bg-background/60">
                              <CardContent className="p-0">
                                {deal.image && (
                                  <img src={deal.image} alt={t(deal.title)} className="object-cover w-full h-48" />
                                )}
                                <div className="absolute right-0 bottom-0 left-0 p-3 text-white bg-gradient-to-t to-transparent from-black/70">
                                  <h3 className="mb-1 text-base font-semibold">{t(deal.title)}</h3>
                                  <p className="text-xs">{t(deal.description)}</p>
                                </div>
                                {deal.discount && (
                                  <div className="absolute top-3 right-3 px-2 py-0.5 text-xs font-semibold text-white bg-red-600 rounded-full">
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
              </Carousel>
            </div>
          </div>
        )}
        <div className="sticky top-0 z-10 p-4">
          <div className="p-4 rounded-2xl ring-1 shadow-md backdrop-blur bg-white/70 ring-black/5">
            {/* Search bar */}
            <div className="mb-2">
              <Input
                type="text"
                placeholder={t("Search items...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 text-sm rounded-full ring-1 shadow-inner bg-white/70 ring-black/5"
              />
            </div>

            {/* Modified categories section with onScroll handler */}
            <div ref={scrollContainerRef} className="flex overflow-x-auto pb-1 space-x-2" onScroll={handleScroll}>
              {categories.map((category: CategoryType) => (
                <button
                  key={category.id}
                  ref={(el) => (categoryRefs.current[category.id] = el)}
                  style={
                    category.id === selectedCategory
                      ? { backgroundColor: theme.primary }
                      : {}
                  }
                  onClick={() => handleCategoryClick(category.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-full transition-all duration-300 whitespace-nowrap ring-1 ${
                    category.id === selectedCategory
                      ? "bg-primary text-primary-foreground shadow-md ring-primary/40"
                      : "bg-white/60 text-foreground hover:bg-white ring-black/5"
                  }`}
                >
                  {category.icon && (
                    <span className="text-base">
                      {getIconComponent(category.icon)}
                    </span>
                  )}
                  {t(category.name)}
                </button>
              ))}
              {isFetchingNextPage && (
                <div className="flex items-center px-4">
                  <Skeleton className="w-20 h-8" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Items grid */}
        <div className="overflow-y-auto flex-grow p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isItemsLoading ? (
              // Render skeletons when items are loading
              Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="shadow-md animate-pulse">
                    <CardHeader className="p-3">
                    <Skeleton className="w-full h-40 rounded-t-lg" />
                      <Skeleton className="mt-2 w-2/3 h-5" />
                      <Skeleton className="mt-2 w-1/3 h-4" />
                  </CardHeader>
                    <CardFooter className="p-3">
                    <Skeleton className="w-1/4 h-4" />
                  </CardFooter>
                </Card>
              ))
            ) : filteredItems.length > 0 ? (
              // Render filtered items
              filteredItems.map((item: ItemType) => (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <Card className="relative h-full flex flex-col overflow-hidden rounded-3xl bg-card/80 ring-1 ring-white/10 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 cursor-pointer hover:shadow-[0_12px_36px_-10px_rgba(0,0,0,0.35)]">
                      <CardHeader className="flex-shrink-0 p-0">
                        {item.image && (
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={t(item.name)}
                              className="object-cover w-full h-40"
                            />
                            {/* curved top container */}
                            <div
                              className="absolute inset-x-0 -bottom-3 h-6 backdrop-blur bg-card/80"
                              style={{
                                borderTopLeftRadius: "1.5rem",
                                borderTopRightRadius: "1.5rem",
                              }}
                            />
                          </div>
                        )}
                        <div className="p-3 min-h-[64px] flex flex-col gap-1">
                          <CardTitle className="text-sm font-semibold">
                            {t(item.name)}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardFooter className="flex justify-between items-center p-3 pt-0 mt-auto">
                        <div className="text-sm font-semibold text-primary">
                          {t("IQD")} {item.price.toLocaleString()}
                        </div>
                      </CardFooter>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="h-fit">
                    <DialogHeader>
                      <DialogTitle>{t(item.name)}</DialogTitle>
                      <DialogDescription className="text-xs text-gray-500">
                        {t(item.description || "")}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="p-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={t(item.name)}
                          className="object-cover mb-3 w-full rounded-lg"
                          style={{ maxHeight: "40vh" }}
                        />
                      )}
                      <div className="flex justify-between items-center">
                        <p className="text-base font-bold text-primary">
                          {t("IQD")} {item.price.toLocaleString()}
                        </p>
                        <Button size="sm">
                          <Plus className="w-4 h-4" /> {t("Add to Order")}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))
            ) : (
              // Show a message when no items match the search
              <p className="col-span-full text-center text-gray-500">
                {t("No items found matching your search.")}
              </p>
            )}
          </div>
        </div>
      </div>
  );
};

export default MenuPage;
