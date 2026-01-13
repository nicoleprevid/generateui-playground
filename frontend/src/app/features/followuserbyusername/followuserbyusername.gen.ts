
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Injectable } from '@angular/core'
import { FollowUserByUsernameService } from './followuserbyusername.service.gen'

@Injectable()
export class FollowUserByUsernameGen {
  constructor(
    protected fb: FormBuilder,
    protected service: FollowUserByUsernameService
  ) {
    this.form = this.fb.group({
    username: ['', Validators.required]
    })
  }

  form!: FormGroup
  loading = false
  result: any = null
  error: any = null

  protected pick(source: Record<string, any>, keys: string[]) {
    const out: Record<string, any> = {}
    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        out[key] = source[key]
      }
    }
    return out
  }
}
