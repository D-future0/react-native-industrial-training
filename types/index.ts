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
  skill: string;
  isDark: boolean;
};

export type AvailabilityProps = {
    isWide: boolean;
    isDark: boolean;
    isAvailable: boolean;
    setIsAvailable: (value: boolean) => void;
}