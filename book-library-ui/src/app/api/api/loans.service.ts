/**
 * Book Library
 * This is a sample API that describes the structure of our Book-Library-Server
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParameterCodec, HttpParams, HttpResponse} from '@angular/common/http';
import {CustomHttpParameterCodec} from '../encoder';
import {Observable} from 'rxjs';

import {InlineResponse2004, InlineResponse2022, LoanList, NewLoan, UpdateLoan} from '../model/models';

import {BASE_PATH} from '../variables';
import {Configuration} from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class LoansService {

  protected basePath = 'http://localhost';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  public encoder: HttpParameterCodec;

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (configuration) {
      this.configuration = configuration;
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (typeof basePath !== 'string') {
        basePath = this.basePath;
      }
      this.configuration.basePath = basePath;
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
  }


  private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
    if (typeof value === "object" && value instanceof Date === false) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value);
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
    }
    return httpParams;
  }

  private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
    if (value == null) {
      return httpParams;
    }

    if (typeof value === "object") {
      if (Array.isArray(value)) {
        (value as any[]).forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(key,
            (value as Date).toISOString().substr(0, 10));
        } else {
          throw Error("key may not be null if value is Date");
        }
      } else {
        Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(
          httpParams, value[k], key != null ? `${key}.${k}` : k));
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value);
    } else {
      throw Error("key may not be null if value is not object or array");
    }
    return httpParams;
  }

  /**
   * Delete loan by id
   * Simple delete interface used to delete loan by ID
   * @param userId
   * @param loanId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteLoan(userId: string, loanId: string, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<any>;
  public deleteLoan(userId: string, loanId: string, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpResponse<any>>;
  public deleteLoan(userId: string, loanId: string, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpEvent<any>>;
  public deleteLoan(userId: string, loanId: string, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: 'application/json' }): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling deleteLoan.');
    }
    if (loanId === null || loanId === undefined) {
      throw new Error('Required parameter loanId was null or undefined when calling deleteLoan.');
    }

    let headers = this.defaultHeaders;

    // authentication (sessionCookie) required
    if (this.configuration.apiKeys) {
      const key: string | undefined = this.configuration.apiKeys["sessionCookie"] || this.configuration.apiKeys["null"];
      if (key) {
      }
    }

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        'application/json'
      ];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }


    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.delete<any>(`${this.configuration.basePath}/v1/loans/${encodeURIComponent(String(userId))}/delete/${encodeURIComponent(String(loanId))}`,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * List all loans for a specific user
   * Simple getter interface used to get all loans
   * @param userId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listAllLoans(userId: string, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<Array<LoanList>>;
  public listAllLoans(userId: string, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpResponse<Array<LoanList>>>;
  public listAllLoans(userId: string, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpEvent<Array<LoanList>>>;
  public listAllLoans(userId: string, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: 'application/json' }): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling listAllLoans.');
    }

    let headers = this.defaultHeaders;

    // authentication (sessionCookie) required
    if (this.configuration.apiKeys) {
      const key: string | undefined = this.configuration.apiKeys["sessionCookie"] || this.configuration.apiKeys["null"];
      if (key) {
      }
    }

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        'application/json'
      ];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }


    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.get<Array<LoanList>>(`${this.configuration.basePath}/v1/loans/${encodeURIComponent(String(userId))}/all`,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * initiate new loan
   * Simple create interface used to create a new book in the databse
   * @param userId
   * @param newLoan Create loan requestBody
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public newLoan(userId: string, newLoan: NewLoan, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<InlineResponse2022>;
  public newLoan(userId: string, newLoan: NewLoan, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpResponse<InlineResponse2022>>;
  public newLoan(userId: string, newLoan: NewLoan, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpEvent<InlineResponse2022>>;
  public newLoan(userId: string, newLoan: NewLoan, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: 'application/json' }): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling newLoan.');
    }
    if (newLoan === null || newLoan === undefined) {
      throw new Error('Required parameter newLoan was null or undefined when calling newLoan.');
    }

    let headers = this.defaultHeaders;

    // authentication (sessionCookie) required
    if (this.configuration.apiKeys) {
      const key: string | undefined = this.configuration.apiKeys["sessionCookie"] || this.configuration.apiKeys["null"];
      if (key) {
      }
    }

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        'application/json'
      ];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }


    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.post<InlineResponse2022>(`${this.configuration.basePath}/v1/loans/${encodeURIComponent(String(userId))}/init`,
      newLoan,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Finds user by user-id
   * Simple getter interface used to get an existing user by its ID
   * @param userId
   * @param loanId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public retreiveLoan(userId: string, loanId: string, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<InlineResponse2004>;
  public retreiveLoan(userId: string, loanId: string, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpResponse<InlineResponse2004>>;
  public retreiveLoan(userId: string, loanId: string, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpEvent<InlineResponse2004>>;
  public retreiveLoan(userId: string, loanId: string, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: 'application/json' }): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling retreiveLoan.');
    }
    if (loanId === null || loanId === undefined) {
      throw new Error('Required parameter loanId was null or undefined when calling retreiveLoan.');
    }

    let headers = this.defaultHeaders;

    // authentication (sessionCookie) required
    if (this.configuration.apiKeys) {
      const key: string | undefined = this.configuration.apiKeys["sessionCookie"] || this.configuration.apiKeys["null"];
      if (key) {
      }
    }

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        'application/json'
      ];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }


    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.get<InlineResponse2004>(`${this.configuration.basePath}/v1/loans/${encodeURIComponent(String(userId))}/retrieve/${encodeURIComponent(String(loanId))}`,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Update an existing loan
   * Simple update interface used to update an existing loan in the database
   * @param userId
   * @param loanId
   * @param updateBook update loan requestBody
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateLoan(userId: string, loanId: string, updateBook: UpdateLoan, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<any>;
  public updateLoan(userId: string, loanId: string, updateBook: UpdateLoan, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpResponse<any>>;
  public updateLoan(userId: string, loanId: string, updateBook: UpdateLoan, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpEvent<any>>;
  public updateLoan(userId: string, loanId: string, updateBook: UpdateLoan, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: 'application/json' }): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling updateLoan.');
    }
    if (loanId === null || loanId === undefined) {
      throw new Error('Required parameter loanId was null or undefined when calling updateLoan.');
    }
    if (updateBook === null || updateBook === undefined) {
      throw new Error('Required parameter updateBook was null or undefined when calling updateLoan.');
    }

    let headers = this.defaultHeaders;

    // authentication (sessionCookie) required
    if (this.configuration.apiKeys) {
      const key: string | undefined = this.configuration.apiKeys["sessionCookie"] || this.configuration.apiKeys["null"];
      if (key) {
      }
    }

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        'application/json'
      ];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }


    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.put<any>(`${this.configuration.basePath}/v1/loans/${encodeURIComponent(String(userId))}/update/${encodeURIComponent(String(loanId))}`,
      updateBook,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

}
