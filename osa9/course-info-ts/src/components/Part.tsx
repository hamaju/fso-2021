import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  switch (coursePart.name) {
    case 'Fundamentals':
      return (
        <>
          <div>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{coursePart.description}</em>
          </div>
          <br />
        </>
      );
    case 'Advanced':
      return (
        <>
          <div>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{coursePart.description}</em>
          </div>
          <br />
        </>
      );
    case 'Using props to pass data':
      return (
        <>
          <div>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </div>
          <div>project exercises: {coursePart.groupProjectCount}</div>
          <br />
        </>
      );
    case 'Deeper type usage':
      return (
        <>
          <div>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{coursePart.description}</em>
          </div>
          <div>submit to {coursePart.exerciseSubmissionLink}</div>
          <br />
        </>
      );
    case 'Backend development':
      return (
        <>
          <div>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{coursePart.description}</em>
          </div>
          <div>required skills: {coursePart.requirements.join(', ')}</div>
        </>
      );
    default:
      return null;
  }
};

export default Part;
