
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
export class CreateArticleService {
  private readonly baseUrl = 'https://api.realworld.io/api'
  private readonly endpoint = '/articles'
  private readonly pathParams = []

  constructor(private http: HttpClient) {}

  execute(pathParams: Record<string, any>, payload: Record<string, any>) {
    const url = this.buildUrl(pathParams)
    const body = this.buildBody(payload)
    return this.http.post(url, body)
  }

  private buildUrl(pathParams: Record<string, any>) {
    let url = `${this.baseUrl}${this.endpoint}`
    for (const key of this.pathParams) {
      const value = pathParams?.[key]
      url = url.replace(`{${key}}`, encodeURIComponent(String(value)))
    }
    return url
  }

  private buildBody(payload: Record<string, any>) {
    const cleaned = payload ?? {}
    return { article: cleaned }
  }
}
