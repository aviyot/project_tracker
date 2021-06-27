import { LIFECYCLE_STAGE } from 'src/types/lifecycleStage.type';
import { Timestamp } from '@firebase/firestore-types';

export interface ProjectDesc {
  name: string;
  desc: string;
  startTime: Date;
  endTime?: Date;
  lifecycleStage: LIFECYCLE_STAGE;
  gitHub?: string;
  site: string;
  filePath: string;
}
