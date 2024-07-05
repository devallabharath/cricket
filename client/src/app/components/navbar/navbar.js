// import { useTheme, toggleTheme } from "@slices/themeSlice";
// import { useDispatch } from "react-redux";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const routes = [
  { name: "Matches", url: "/matches" },
  { name: "Teams", url: "/teams" },
  { name: "Players", url: "/players" },
];

const styles = {
  header:
    "flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-2 dark:bg-neutral-900",
  nav: "max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between",
  head: "flex-none flex gap-2 items-center",
  brand: "flex gap-2 items-center text-xl font-semibold",
  logo: "h-8",
  dark: "p-1 rounded-md bg-neutral-300 text-black light:text-yellow-500 hover:bg-neutral-400",
  links: "flex flex-row items-center gap-5 mt-2 sm:justify-end sm:mt-0 sm:ps-5",
  link: "text-md text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500",
};

const Navbar = () => {
  const theme = 'dark';
  // const dispacth = useDispatch();

  const isDark = () => theme === "dark";
  const toggleDark = () => {
    // dispacth(toggleTheme());
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Global">
        <div className={styles.head}>
          <a className={styles.brand} href="/">
            <img
              src={require("../../assets/images/logo.jpeg")}
              className={styles.logo}
              alt="logo"
            />
            Summer Series 24
          </a>
          <button className={styles.dark} onClick={toggleDark}>
            {isDark() ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>
        <div className={styles.links}>
          {routes.map((route, id) => {
            return (
              <a key={id} className={styles.link} href={route.url}>
                {route.name}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
