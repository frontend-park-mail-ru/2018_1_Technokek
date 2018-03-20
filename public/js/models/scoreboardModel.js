'use strict';


import globalValues from '../components/gloabalData.js';
import AbstractSMTableModel from './abstractSMTableModel.js';

const scoreboardModel = new AbstractSMTableModel({
    pageLoadUrl: ({mode, pageNumber}) => `/scoreboard/${mode}/page/${pageNumber}`
});

export default scoreboardModel;