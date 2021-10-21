import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content = ({ courseParts }: ContentProps) => {
  const parts = courseParts.map((part) => {
    switch (part.name) {
      case 'Fundamentals':
        return <Part key={part.name} coursePart={part} />;
      case 'Advanced':
        return <Part key={part.name} coursePart={part} />;
      case 'Using props to pass data':
        return <Part key={part.name} coursePart={part} />;
      case 'Deeper type usage':
        return <Part key={part.name} coursePart={part} />;
      case 'Backend development':
        return <Part key={part.name} coursePart={part} />;
      default:
        return assertNever(part);
    }
  });

  return <>{parts}</>;
};

export default Content;
