import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import axios from '../axiosInstance';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { getThemeColors } from '@/utils';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { iconOptions } from '@/utils/data';

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
  const response = await axios.get(`/category?page=${pageParam}&restaurantId=${localStorage.getItem('RestaurantID')}`);
  return response.data;
};

const fetchItems = async (categoryId: string) => {
  const response = await axios.get(`/category/${categoryId}`);
  return response.data.items;
};

const fetchDeals = async () => {
  const response = await axios.get(`/deal?restaurantId=${localStorage.getItem('RestaurantID')}&published=true`);
  return response.data.items;
};

const MenuPage: React.FC = () => {
  const { t,i18n } = useTranslation();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term
  const theme = getThemeColors();
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {
    data: categoriesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  // Flatten categories data from all pages
  const categories = categoriesData?.pages.flatMap(page => page.items) ?? [];

  // Handle scroll to check if we're near the end
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    let isNearEnd = null;
    
    if (i18n.language === 'ar') {
      // For Arabic, check if we're near the right edge since scrollLeft will be negative
      isNearEnd = Math.abs(container.scrollLeft) + container.clientWidth >= container.scrollWidth - 20;
    } else {
      // For LTR languages, check if we're near the right edge
      isNearEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 20;
    }

    if (isNearEnd && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const { data: items = [], isPending: isItemsLoading } = useQuery({
    queryKey: ['items', selectedCategory],
    queryFn: () => fetchItems(selectedCategory!),
    enabled: !!selectedCategory
  });

  const { data: deals = [], isPending: isDealsLoading } = useQuery({
    queryKey: ['deals'],
    queryFn: fetchDeals
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
      const scrollLeft = button.offsetLeft - scrollContainer.offsetWidth / 2 + button.offsetWidth / 2;
      scrollContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  // New function to filter items based on search term
  const filteredItems = items.filter((item: ItemType) =>
    t(item.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
    t(item.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIconComponent = (iconName?: string) => {
    if (!iconName) return null;
    const icon = iconOptions.find((option: { title: string; value: any }) => option.title === iconName);
    return icon ? icon.value : null;
  };
  // Add a new useEffect to check for scroll possibility
  useEffect(() => {
    const checkForScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      // If there's no horizontal scroll and we have more pages to load
      if (container.scrollWidth <= container.clientWidth && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    // Check initially and after any window resize
    checkForScroll();
    window.addEventListener('resize', checkForScroll);

    // Cleanup
    return () => window.removeEventListener('resize', checkForScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, categoriesData]);

  return (
    <div className="flex flex-col h-screen">
       {/* Deals Carousel */}
       {deals.length > 0 && (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{t('Special Deals')}</h2>
            <Carousel className="w-full rounded-lg" opts={{ loop: true, align: "center" }}>
              <CarouselContent>
                {deals.map((deal: DealType) => (
                  <CarouselItem key={deal.id} className="basis-full">
                    <div className="relative">
                      <Card className="overflow-hidden rounded-lg">
                        <CardContent className="p-0">
                          {deal.image && (
                            <img src={deal.image} alt={t(deal.title)} className="w-full h-64 object-contain" />
                          )}
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                            <h3 className="text-xl font-semibold mb-2">{t(deal.title)}</h3>
                            <p className="text-sm">{t(deal.description)}</p>
                          </div>
                          {deal.discount && (
                            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
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
        )}
      <div className="sticky top-0 z-10 bg-background p-4 ">
        {/* Search bar */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder={t('Search items...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full"
          />
        </div>

        {/* Modified categories section with onScroll handler */}
        <div 
          ref={scrollContainerRef} 
          className="flex overflow-x-auto pb-4 space-x-2"
          onScroll={handleScroll}
        >
          {categories.map((category: CategoryType) => (
            <button
              key={category.id}
              ref={(el) => categoryRefs.current[category.id] = el}
              style={category.id === selectedCategory ? { backgroundColor: theme.primary } : {}}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap mx-2 ${category.id === selectedCategory
                  ? 'text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category.icon && (
                <span className="mr-2 text-lg">
                  {getIconComponent(category.icon)}
                </span>
              )}
              {t(category.name)}
            </button>
          ))}
          {isFetchingNextPage && (
            <div className="flex items-center px-4">
              <Skeleton className="h-8 w-20" />
            </div>
          )}
        </div>
      </div>
       
      {/* Items grid */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isItemsLoading ? (
            // Render skeletons when items are loading
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="shadow-md animate-pulse">
                <CardHeader>
                  <Skeleton className="w-full h-60 rounded-t-lg" />
                  <Skeleton className="h-6 w-3/4 mt-2" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardFooter>
                  <Skeleton className="h-5 w-1/4" />
                </CardFooter>
              </Card>
            ))
          ) : filteredItems.length > 0 ? (
            // Render filtered items
            filteredItems.map((item: ItemType) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer shadow-md transition-shadow duration-300">
                    <CardHeader>
                      {item.image && (
                        <img src={item.image} alt={t(item.name)} className="w-full object-contain h-60 rounded-t-lg" />
                      )}
                      <CardTitle className="text-lg font-semibold mt-2">{t(item.name)}</CardTitle>
                      <CardDescription className="text-sm text-gray-500 truncate">{t(item.description || '')}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <p className="text-primary font-bold text-green-600">{t('IQD')} {item.price.toLocaleString()}</p>
                    </CardFooter>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t(item.name)}</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">{t(item.description || '')}</DialogDescription>
                  </DialogHeader>
                  <div className="p-4">
                    {item.image && (
                      <img src={item.image} alt={t(item.name)} className="w-full object-cover rounded-lg mb-4" style={{ maxHeight: '60vh' }} />
                    )}
                    <p className="text-lg font-bold text-primary mb-2">{t('IQD')} {item.price.toLocaleString()}</p>
                  </div>
                </DialogContent>
              </Dialog>
            ))
          ) : (
            // Show a message when no items match the search
            <p className="col-span-full text-center text-gray-500">{t('No items found matching your search.')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
