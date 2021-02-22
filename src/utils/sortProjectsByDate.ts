import { lensProp, map, pipe, prop, set, sortBy, view } from 'ramda';
import { IProject } from 'models/cv';

const toDate = (dateStr: string) => {
  return new Date(dateStr);
};

function sortProjectsByDate(list: IProject[]): IProject[] {
  const dateLens = lensProp('projectEndDate');
  const byTime = (date: Date) => -date.getTime();
  const transformDateInObj = <T>(lens: any) => (item: T): T => set(lens, toDate(view(lens, item) as string), item);

  return pipe(
    map(transformDateInObj(dateLens)),
    sortBy(pipe(prop('projectEndDate'), byTime))
  )(list) as IProject[];
}

export default sortProjectsByDate;
