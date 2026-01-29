
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
export class GetProductByIdService {
  private readonly baseUrl = 'https://dummyjson.com'
  private readonly endpoint = '/products/{id}'
  private readonly pathParams = ["id"]

  constructor(private http: HttpClient) {}

  execute(
    pathParams: Record<string, any>,
    queryParams: Record<string, any>,
    payload: Record<string, any>
  ) {
    const url = this.buildUrl(pathParams, queryParams)
    const body = this.buildBody(payload)
    return this.http.get(url)
  }

  private buildUrl(
    pathParams: Record<string, any>,
    queryParams: Record<string, any>
  ) {
    let url = `${this.baseUrl}${this.endpoint}`
    for (const key of this.pathParams) {
      const value = pathParams?.[key]
      url = url.replace(`{${key}}`, encodeURIComponent(String(value)))
    }
    const query = this.buildQuery(queryParams)
    if (query) {
      url += `?${query}`
    }
    return url
  }

  private buildQuery(queryParams: Record<string, any>) {
    const params = new URLSearchParams()
    for (const key of Object.keys(queryParams || {})) {
      const value = queryParams[key]
      if (value === undefined || value === null || value === '') continue
      const out = Array.isArray(value) ? value.join(',') : String(value)
      params.set(key, out)
    }
    return params.toString()
  }

  private buildBody(payload: Record<string, any>) {
    const cleaned = payload ?? {}
    return cleaned
  }
}
