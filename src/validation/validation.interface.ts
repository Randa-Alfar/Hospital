import JOI from '@hapi/joi'

export interface ISchema {
    headers?: JOI.ObjectSchema;
    query?: JOI.ObjectSchema;
    params?: JOI.ObjectSchema;
    body?: JOI.Schema;
  }
  
  export interface IRequestData {
      headers?: { [key: string]: string };
      query?: { [key: string]: string };
      params?: any[];
      body?: any;
  }