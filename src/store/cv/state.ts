import { createEntityAdapter } from '@reduxjs/toolkit';
import { CVDto } from '../../api/services/cv.api';

export const cvAdapter = createEntityAdapter<CVDto>();
