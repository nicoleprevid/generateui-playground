
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Injectable } from '@angular/core'
import { DeleteArticleCommentService } from './deletearticlecomment.service.gen'

@Injectable()
export class DeleteArticleCommentGen {
  constructor(
    protected fb: FormBuilder,
    protected service: DeleteArticleCommentService
  ) {
    this.form = this.fb.group({
    slug: ['', Validators.required],
    id: ['', Validators.required]
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
