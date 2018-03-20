'use strict';

import globalValues from '../components/gloabalData.js';
import AbstractSMTableModel from './abstractSMTableModel.js';

const historyModel = new AbstractSMTableModel({
    pageLoadUrl: ({mode, pageNumber}) => `/history/${mode}/page/${pageNumber}`
});

export default historyModel;