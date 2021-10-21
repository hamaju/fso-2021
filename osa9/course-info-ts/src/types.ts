export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CourseInfoPart extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends CourseInfoPart {
  name: 'Fundamentals' | 'Advanced';
  type: 'normal';
}

export interface CourseProjectPart extends CoursePartBase {
  name: 'Using props to pass data';
  type: 'groupProject';
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseInfoPart {
  name: 'Deeper type usage';
  type: 'submission';
  exerciseSubmissionLink: string;
}

export interface CourseRequirementsPart extends CourseInfoPart {
  name: 'Backend development';
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseRequirementsPart;
