import React from 'react';
import { PageHeader, PageHeaderProps } from './PageHeader';

export type HeroProps = PageHeaderProps;

export const Hero: React.FC<HeroProps> = (props) => {
  return <PageHeader {...props} />;
};

export default Hero;
