import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "../../axiosInstance";
import { Skeleton } from "../ui/skeleton";
import { getThemeColors } from "@/utils";
import { useTranslation } from "react-i18next";
import { iconOptions } from "@/utils/data";

export interface CategoryType {
  id: string;
  name: string;
  icon?: string;
}

type Props = {
  onCategoryChange: (categoryId: string) => void;
};

const fetchCategories = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `/category?page=${pageParam}&restaurantId=${localStorage.getItem(
      "RestaurantID"
    )}`
  );
  return response.data;
};

const CategoriesBar: React.FC<Props> = ({ onCategoryChange }) => {
  const theme = getThemeColors();
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const categories: CategoryType[] = useMemo(() => {
    const fetched = categoriesData?.pages.flatMap((page: any) => page.items) ?? [];
    return fetched;
  }, [categoriesData]);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      const firstId = categories[0].id;
      setSelectedCategory(firstId);
      onCategoryChange(firstId);
    }
  }, [categories, selectedCategory, onCategoryChange]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const container = e.currentTarget;
      let isNearEnd = null as null | boolean;

      if (i18n.language === "ar") {
        isNearEnd =
          Math.abs(container.scrollLeft) + container.clientWidth >=
          container.scrollWidth - 20;
      } else {
        isNearEnd =
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 20;
      }

      if (isNearEnd && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, i18n.language]
  );

  useEffect(() => {
    const checkForScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      if (
        container.scrollWidth <= container.clientWidth &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    const handleResize = () => {
      if ((handleResize as any)._raf) cancelAnimationFrame((handleResize as any)._raf);
      (handleResize as any)._raf = requestAnimationFrame(checkForScroll);
    };

    checkForScroll();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if ((handleResize as any)._raf) cancelAnimationFrame((handleResize as any)._raf);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, categoriesData]);

  const getIconComponent = (iconName?: string) => {
    if (!iconName) return null;
    const icon = iconOptions.find(
      (option: { title: string; value: any }) => option.title === iconName
    );
    return icon ? icon.value : null;
  };

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      setSelectedCategory(categoryId);
      onCategoryChange(categoryId);
      const button = categoryRefs.current[categoryId];
      if (button && scrollContainerRef.current) {
        const scrollContainer = scrollContainerRef.current;
        const scrollLeft =
          button.offsetLeft -
          scrollContainer.offsetWidth / 2 +
          button.offsetWidth / 2;
        scrollContainer.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    },
    [onCategoryChange]
  );

  return (
    <div
      ref={scrollContainerRef}
      className="flex overflow-x-auto pb-3 rtl:space-x-reverse scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onScroll={handleScroll}
    >
      {categories.map((category) => (
        <button
          key={category.id}
          ref={(el) => (categoryRefs.current[category.id] = el)}
          style={
            category.id === selectedCategory ? { backgroundColor: theme.primary } : {}
          }
          onClick={() => handleCategoryClick(category.id)}
          className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap mx-2 snap-start shadow-sm hover:shadow ${
            category.id === selectedCategory
              ? "text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
          aria-pressed={category.id === selectedCategory}
        >
          {category.icon && (
            <span className="mx-2 text-lg">{getIconComponent(category.icon)}</span>
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
  );
};

export default CategoriesBar;


