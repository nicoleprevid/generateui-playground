import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { FormField, ScreenSchema } from '../../types/form-schema'

@Component({
  selector: 'app-form-renderer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page">
  <form class="card" [formGroup]="formGroup">
    <h1 class="title">
      {{ schema.api.operationId }}
    </h1>

    <div class="fields">
      <div class="field" *ngFor="let field of schema.fields">
        <label>
          {{ field.label ?? field.name }}
        </label>

        <input
          [type]="inputType(field)"
          [formControlName]="controlName(field)"
          [class.invalid]="isInvalid(field)"
        />

        <small *ngIf="isInvalid(field)">
          Campo obrigatório
        </small>
      </div>
    </div>

    <button
      type="submit"
      class="primary-button"
      [disabled]="formGroup.invalid"
    >
      {{ schema.actions?.primary?.label }}
    </button>
  </form>
</div>

  `,
  styles: [`
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

.card {
  width: 100%;
  max-width: 420px;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: 32px;
}

.title {
  margin: 0 0 24px;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 14px;
  color: var(--color-muted);
}

input {
  height: 44px;
  padding: 0 14px;
  border-radius: var(--radius-md);
  border: 1px solid #e5e7eb;
  font-size: 15px;
  transition: all 0.2s ease;
}

input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

input.invalid {
  border-color: #ef4444;
}

small {
  font-size: 12px;
  color: #ef4444;
}

.primary-button {

  margin-top: 28px;
  height: 48px;
  width: 50%;
  border-radius: var(--radius-md);
  border: none;
  background: var(--color-primary);
  color: white;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.primary-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.25);
}

.primary-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

  `]
})
export class FormRendererComponent implements OnInit {
  @Input() schema!: ScreenSchema

  formGroup!: FormGroup

  constructor(private fb: FormBuilder) { }
  API_BASE_URL = 'https://api.realworld.io/api'

  ngOnInit() {
    this.formGroup = this.fb.group({})

    this.schema.fields.forEach(field => {
      this.formGroup.addControl(
        this.controlName(field),
        this.fb.control(
          '',
          field.required ? Validators.required : []
        )
      )
    })
  }

  controlName(field: FormField) {
    // ex: email → email
    return field.name.replace('.', '_')
  }

  inputType(field: FormField) {
    switch (field.ui) {
      case 'email':
        return 'email'
      case 'password':
        return 'password'
      case 'number':
        return 'number'
      default:
        return 'text'
    }
  }

  isInvalid(field: FormField) {
    const control = this.formGroup.get(this.controlName(field))
    return !!(control?.invalid && control?.touched)
  }

  onSubmit() {
    if (this.formGroup.invalid) return

    let payload = { ...this.formGroup.value }

    // 🔑 aplica regra de transporte da API
    if (this.schema.api.submit?.wrap) {
      payload = {
        [this.schema.api.submit.wrap]: payload
      }
    }
    const url = `${this.API_BASE_URL}${this.schema.api.endpoint}`

    fetch(url, {
      method: this.schema.api.method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })


    console.log('Payload enviado:', payload)
  }
}
