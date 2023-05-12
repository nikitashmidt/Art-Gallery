import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

interface IAppContext {
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
}

const theme = localStorage.getItem('isDark') as string;

const getTheme = JSON.parse(theme) as boolean;

const ThemeContext = createContext<IAppContext>({
  isDark: getTheme,
  toggleTheme: (isDark) => isDark,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(getTheme);

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);
    localStorage.setItem('isDark', String(!isDark));
  }, [isDark]);

  const value = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export default useTheme;
