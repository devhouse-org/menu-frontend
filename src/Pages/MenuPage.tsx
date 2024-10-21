import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '../axiosInstance';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../components/ui/drawer";
import { getThemeColors } from '@/utils';
import { useTranslation } from 'react-i18next';
// Import the translation function

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

const fetchCategories = async () => {
  const response = await axios.get(`/category?page=all&restaurantId=${localStorage.getItem('RestaurantID')}`);
  return response.data.items;
};

const fetchItems = async (categoryId: string) => {
  const response = await axios.get(`/category/${categoryId}`);
  return response.data.items;
};

const MenuPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const theme = getThemeColors();
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const { data: items = [] } = useQuery({
    queryKey: ['items', selectedCategory],
    queryFn: () => fetchItems(selectedCategory!),
    enabled: !!selectedCategory
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

  return (
    <div className="p-4">
      <div ref={scrollContainerRef} className="flex overflow-x-auto pb-4 mb-6 space-x-2">
        {categories.map((category: CategoryType) => (
          <button
            key={category.id}
            ref={(el) => categoryRefs.current[category.id] = el}
            style={category.id === selectedCategory ? { backgroundColor: theme.primary } : {}}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
              category.id === selectedCategory
                ? 'text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {category.icon && (
              <img src={category.icon} alt={t(category.name)} className="w-5 h-5 mr-2" />
            )}
            {t(category.name)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item: ItemType) => (
          <Drawer key={item.id}>
            <DrawerTrigger asChild>
              <Card className="cursor-pointer shadow-md transition-shadow duration-300">
                <CardHeader>
                  {item.image && (
                    <img src={item.image} alt={t(item.name)} className="w-full h-48 object-cover rounded-t-lg" />
                  )}
                  <CardTitle className="text-lg font-semibold mt-2">{t(item.name)}</CardTitle>
                  <CardDescription className="text-sm text-gray-500 truncate">{t(item.description || '')}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <p className="text-primary font-bold text-green-600">{t('IQD {price}', { price: item.price.toLocaleString() })}</p>
                </CardFooter>
              </Card>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{t(item.name)}</DrawerTitle>
                <DrawerDescription className="text-sm text-gray-500">{t(item.description || '')}</DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                {item.image && (
                  <img src={item.image} alt={t(item.name)} className="w-full h-64 object-cover rounded-lg mb-4" />
                )}
                <p className="text-lg font-bold text-primary mb-2">{t('IQD {price}', { price: item.price.toLocaleString() })}</p>
                {/* Add more details or actions here */}
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
