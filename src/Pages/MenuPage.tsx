import { useEffect, useState } from "react";
import Modal from "../components/Menu/Modal";
import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getThemeColors } from "../utils";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const MenuPage = () => {
  // State to track which modal is open
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [showSideBar, setShowSideBar] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(
    null
  );
  const { t, i18n } = useTranslation();
  const theme = getThemeColors();

  const { data, isError, isPending } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/restaurant/access/${localStorage.getItem("accessCode")}`
      );
      setSelectedCategory(response.data.categories[0]);
      return response.data;
    },
  });

  // Handle opening a modal
  const handleOpenModal = (itemId: string) => {
    setOpenModalId(itemId);
  };

  // Handle closing a modal
  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  // Add the effect to set sidebar state to false on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowSideBar(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isPending) {
    return <div>{t("Loading...")}</div>;
  }

  if (isError) {
    return <div>{t("Error")}</div>;
  }


  return (
    <div
      className="relative min-h-screen min-w-screen flex font-montserrat"
      style={{
        color: theme.primary,
        backgroundColor: "white",
      }}
    >
      <div className="pt-24">
        <div className="flex p-4 gap-2 relative">
          <div
            className={`${
              showSideBar ? "md:w-80" : " w-0"
            } transition-all max-h-[600px] border font-semibold sticky top-28 mt-10 h-fit overflow-y-auto`}
            style={{
              color: theme.primary,
              backgroundColor: "white",
            }}
          >
            <h2 className="font-bold w-full py-5 flex justify-center items-center">
              {t("Food Categories")}
            </h2>
            <hr
              className="w-fill h-1 border-0 rounded"
              style={{
                backgroundColor: theme.secondary,
              }}
            ></hr>

            <ul className="mt-5 text-sm md:text-lg">
              {data.categories.map((category: any) => {
                return (
                  <li
                    className={`p-2 pl-3 cursor-pointer transition-all ${
                      category.id === selectedCategory.id? "rounded" : ""
                    }`}
                    style={{
                      backgroundColor:
                        category.id === selectedCategory.id
                          ? theme.secondary
                          : "transparent",
                      color:
                        category.id === selectedCategory.id
                          ? "white"
                          : theme.primary,
                    }}
                    onClick={() => setSelectedCategory(category)}
                    key={category.id}
                  >
                    {t(category.name)}
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className={`${showSideBar ? "md:w-[50%] lg:w-[100%] " : "w-full"} `}
          >
            <div className="">
              <div className="flex items-center gap-2">
                {i18n.language === "en" ? (
                  showSideBar ? (
                    <ArrowBigLeft
                      size={35}
                      onClick={() => {
                        setShowSideBar(false);
                      }}
                      className="cursor-pointer hover:bg-gray-100"
                    />
                  ) : (
                    <ArrowBigRight
                      size={35}
                      onClick={() => {
                        setShowSideBar(true);
                      }}
                      className="cursor-pointer hover:bg-gray-100"
                    />
                  )
                ) : showSideBar ? (
                  <ArrowBigRight
                    size={35}
                    onClick={() => {
                      setShowSideBar(false);
                    }}
                    className="cursor-pointer hover:bg-gray-100"
                  />
                ) : (
                  <ArrowBigLeft
                    size={35}
                    onClick={() => {
                      setShowSideBar(true);
                    }}
                    className="cursor-pointer hover:bg-gray-100"
                  />
                )}

                <h1
                  className="z-10 text-3xl font-bold text-center w-full"
                  style={{
                    color: theme.primary,
                  }}
                >
                  {t(selectedCategory.name)}
                </h1>

                {/* Items Card */}
              </div>

              {/* Items Card */}
              <div
                className={`grid ${
                  showSideBar
                    ? "lg:grid-cols-2 "
                    : "lg:grid-cols-3 grid-cols-2 "
                }  gap-4 z-10 py-16 px-2 `}
              >
                {selectedCategory.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="border w-80 rounded p-3 shadow-md hover:shadow-lg flex flex-col gap-4"
                    style={{
                      backgroundColor: "white",
                    }}
                    onClick={() => handleOpenModal(item.id)}
                  >
                    <div className="w-full flex justify-center items-center">
                      <img
                        src={
                          item.image
                            ? item.image
                            : "https://luigispizzakenosha.com/wp-content/uploads/placeholder.png"
                        }
                        alt={item.name}
                        className="lg:h-48 lg:w-96 h-28 w-96 object-cover rounded"
                      />
                    </div>

                    <div className="flex flex-col justify-center gap-2 w-full">
                      <h2 className="w-full text-start font-bold text-sm md:text-lg truncate">
                        {t(item.name)}
                      </h2>
                      <div
                        className="text-sm md:text-md font-bold flex items-end w-full"
                        style={{
                          color: theme.secondary,
                        }}
                      >
                        <span
                          className="pr-1"
                          style={{
                            color: theme.primary,
                          }}
                        >
                          {t("price")}
                        </span>
                        <span className="mx-1">{t("IQD")}</span>
                        <p>{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedCategory.items.map((item: any) => (
        <Modal
          key={item.id}
          open={openModalId === item.id}
          onClose={handleCloseModal}
        >
          {/* Modal content for each item */}
          <div>
            <img
              src={
                item.image
                  ? item.image
                  : "https://luigispizzakenosha.com/wp-content/uploads/placeholder.png"
              }
              alt={item.name}
              className="w-full object-contain rounded"
            />
            <h2 className="w-full text-center font-bold h-1/4 text-2xl py-3">
              {t(item.name)}
            </h2>
            <p>{t(item.description)}</p>

            <div
              className="text-sm md:text-md font-bold flex items-end w-full"
              style={{
                color: theme.secondary,
              }}
            >
              <span
                className="pr-1"
                style={{
                  color: theme.primary,
                }}
              >
                {t("price")}
              </span>
              <span className="mx-1">{t("IQD")}</span>
              <p>{item.price.toLocaleString()}</p>
            </div>
          </div>
        </Modal>
      ))}
    </div>
  );
};

export default MenuPage;
