

export type Project = {
  title: string;
  description: string;
  technology: string;
  link: string;
};

export type ProfileCardProps = {
  isCompact?: boolean;
};

export type SkillCardProps = {
  skill: string;
};

export type AvailabilityProps = {
    isWide: boolean;
    isAvailable: boolean;
    setIsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ProfessionalExperienceProps = {
  company: string;
  years: string;
  role: string;
};