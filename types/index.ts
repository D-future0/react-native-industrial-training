type Project = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
};

export type ProjectCardProps = {
  projects: Project[];
  isDark: boolean;
};

export type ProfileCardProps = {
  isDark?: boolean;
  isCompact?: boolean;
};

export type SkillCardProps = {
  skills: string[];
  isDark: boolean;
};

export type AvailabilityProps = {
    isWide: string;
    isDark: string;
    isAvailable: boolean;
    setIsAvailable: (value: boolean) => void;
}