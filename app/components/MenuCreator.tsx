"use client";

import { ReactNode, useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa6";
import clsx from "clsx";
import {
  ResumeAddressEdit,
  ResumeEducationEdit,
  ResumeEmailEdit,
  ResumeGithubEdit,
  ResumeLanguagesEdit,
  ResumeLinkedInEdit,
  ResumeNameEdit,
  ResumeObjectiveEdit,
  ResumePhoneEdit,
  ResumeSkillsEdit,
  ResumeProjectsEdit,
  ResumeHobbiesEdit,
  ResumeCertificatesEdit,
  ResumeExperienceEdit,
} from ".";
import useResumeReady from "../hooks/useResumeReady";
import { LeftMenuPros } from "./LeftMenu";
import { AnimatePresence, motion } from "motion/react";
interface MenuCreatorProps extends LeftMenuPros {
  //   menus: string[];
  id: string;
}
const MenuCreator = ({ id, handleActiveField }: MenuCreatorProps) => {
  const [activeMenu, setActiveMenu] = useState<string>("");
  const menus = [
    "name", // done
    "phone", // done
    "address", // done
    "email", // done
    "linkedIn", // done
    "github", // done
    "objective", // done
    "education", // done
    "languages", // done
    "skills", // done
    "projects", // done
    "experience", // done
    "certificates", // done
    "hobbies", // done
  ];
  function handleMenu(menu: string): void {
    menu !== activeMenu ? setActiveMenu(menu) : setActiveMenu("");
  }

  const { isResumeReady, requiredFields } = useResumeReady();

  useEffect(() => {
    handleActiveField(activeMenu);
  }, [activeMenu]);

  return (
    <div className="w-full h-auto flex flex-col gap-2">
      {menus.map((menu: string, mIndex: number) => {
        return (
          <Menu
            activeMenu={activeMenu}
            handleMenu={handleMenu}
            id={id}
            isResumeReady={isResumeReady}
            mIndex={mIndex}
            menu={menu}
            requiredFields={requiredFields}
            key={`Menu-${menu}-${mIndex}`}
          />
        );
      })}
    </div>
  );
};

interface MenuProps {
  menu: string;
  activeMenu: string;
  handleMenu: (menu: string) => void;
  mIndex: number;
  isResumeReady: boolean;
  requiredFields: string[];
  id: string;
}

const Menu = ({
  activeMenu,
  handleMenu,
  menu,
  mIndex,
  isResumeReady,
  requiredFields,
  id,
}: MenuProps) => {
  const [isRotate, setIsRotate] = useState<boolean>(false);
  useEffect(() => {
    activeMenu === menu ? setIsRotate(true) : setIsRotate(false);
  }, [activeMenu]);
  return (
    <motion.div
      layout
      key={`menu-${menu}-${mIndex}`}
      className={clsx(
        "w-full h-auto cursor-pointer p-1 rounded-md flex flex-col gap-2"
      )}
      style={{
        backgroundSize: "200% 100%",
        backgroundPosition: "100% 0",
      }}
      animate={{
        backgroundImage:
          !isResumeReady && requiredFields.includes(menu)
            ? "linear-gradient(to right, #F87171, #DC2626)" // Red gradient (Error)
            : activeMenu === menu // menu matches the active menu
            ? "linear-gradient(to right, #9333ea, #3b82f6)" // Purple-300 to Blue-300
            : "linear-gradient(to right, #3b82f6, #9333ea)", // White menu doesn't matches to the active menu
        backgroundSize:
          activeMenu === menu ||
          (!isResumeReady && requiredFields.includes(menu))
            ? "100% 100%"
            : "200% 100%",
        backgroundPosition:
          activeMenu === menu ||
          (!isResumeReady && requiredFields.includes(menu))
            ? "0% 0"
            : "100% 0",
      }}
      transition={{ duration: 1 }}
    >
      {/* menu */}
      <div
        className="flex flex-row justify-between items-center perspective-1000"
        onClick={() => handleMenu(menu)}
      >
        <h3 className="flex-1 text-2xl text-white">{`${
          menu[0].toUpperCase() + menu.slice(1)
        }`}</h3>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isRotate ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className=""
          style={{ transformStyle: "preserve-3d" }}
        >
          <FaCaretDown
            className={clsx(
              // activeMenu === menu ? "rotate-180" : "rotate-0",
              "transition-all duration-100 ease-in w-4 h-4 text-white"
            )}
          />
        </motion.div>
      </div>
      {/* menu content */}
      <div>
        {/* {menu === "name" && <ResumeNameEdit id={`${id}-${menu}`} />} */}
        {menu === "name" && (
          <MenuContent
            MenuComponent={<ResumeNameEdit id={`${id}-${menu}`} />}
            activeMenu={activeMenu}
            menuName={menu}
          />
        )}
        {/* {menu === "phone" && <ResumePhoneEdit id={`${id}-${menu}`} />} */}
        {menu === "phone" && (
          <MenuContent
            MenuComponent={<ResumePhoneEdit id={`${id}-${menu}`} />}
            activeMenu={activeMenu}
            menuName={menu}
          />
        )}
        {menu === "address" && (
          <MenuContent
            MenuComponent={<ResumeAddressEdit id={`${id}-${menu}`} />}
            activeMenu={activeMenu}
            menuName={menu}
          />
        )}
        {menu === "email" && (
          <MenuContent
            MenuComponent={<ResumeEmailEdit id={`${id}-${menu}`} />}
            activeMenu={activeMenu}
            menuName={menu}
          />
        )}
        {menu === "linkedIn" && (
          <MenuContent
            MenuComponent={<ResumeLinkedInEdit id={`${id}-${menu}`} />}
            activeMenu={activeMenu}
            menuName={menu}
          />
        )}
        {menu === "github" && (
          <MenuContent
            MenuComponent={<ResumeGithubEdit id={`${id}-${menu}`} />}
            activeMenu={activeMenu}
            menuName={menu}
          />
        )}
        {menu === "objective" && (
          <MenuContent
            MenuComponent={<ResumeObjectiveEdit id={`${id}-${menu}`} />}
            activeMenu={activeMenu}
            menuName={menu}
          />
        )}
        {menu === "education" && (
          <MenuContent
            MenuComponent={
              <ResumeEducationEdit id={`${id}-${menu}`} limit={3} />
            }
            activeMenu={activeMenu}
            menuName={menu}
          />
        )}
        {menu === "languages" && (
          <MenuContent
            MenuComponent={
              <ResumeLanguagesEdit id={`${id}-${menu}`} limit={2} />
            }
            activeMenu={activeMenu}
            menuName={menu}
          />
        )}
        {menu === "skills" && (
          <MenuContent
            MenuComponent={<ResumeSkillsEdit id={`${id}-${menu}`} limit={2} />}
            activeMenu={activeMenu}
            menuName={menu}
          />
        )}
        {menu === "projects" && (
          <MenuContent
            MenuComponent={
              <ResumeProjectsEdit id={`${id}-${menu}`} limit={2} />
            }
            activeMenu={activeMenu}
            menuName={menu}
          />
        )}
        {menu === "experience" && (
          <MenuContent
            MenuComponent={
              <ResumeExperienceEdit id={`${id}-${menu}`} limit={2} />
            }
            activeMenu={activeMenu}
            menuName={menu}
          />
        )}
        {menu === "certificates" && (
          <MenuContent
            MenuComponent={
              <ResumeCertificatesEdit id={`${id}-${menu}`} limit={2} />
            }
            activeMenu={activeMenu}
            menuName={menu}
          />
        )}
        {menu === "hobbies" && (
          <MenuContent
            MenuComponent={<ResumeHobbiesEdit id={`${id}-${menu}`} limit={2} />}
            activeMenu={activeMenu}
            menuName={menu}
          />
        )}
      </div>
    </motion.div>
  );
};

interface MenuContentProps {
  MenuComponent: ReactNode;
  activeMenu: string;
  menuName: string;
}
const MenuContent = ({
  MenuComponent,
  activeMenu,
  menuName,
}: MenuContentProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    activeMenu === menuName ? setIsVisible(true) : setIsVisible(false);
  }, [activeMenu]);

  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "linear",
          }}
          exit={{ opacity: 0, scale: 0 }}
          key={`Menu-${menuName}`}
        >
          {MenuComponent}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default MenuCreator;
