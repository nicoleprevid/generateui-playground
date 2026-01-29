export type GeneratedMenuItem = {
  id: string
  label: string
  route: string
  hidden?: boolean
  icon?: string
}

export type GeneratedMenuGroup = {
  id: string
  label: string
  items: GeneratedMenuItem[]
  hidden?: boolean
}

export type GeneratedMenu = {
  groups: GeneratedMenuGroup[]
  ungrouped: GeneratedMenuItem[]
}

export const generatedMenu: GeneratedMenu = {
  "groups": [
    {
      "id": "products",
      "label": "Products",
      "items": [
        {
          "id": "getProducts",
          "label": "Get All Products",
          "route": "getProducts"
        },
        {
          "id": "getProductById",
          "label": "Get Product By ID",
          "route": "getProductById"
        },
        {
          "id": "updateProduct",
          "label": "Update A Product",
          "route": "updateProduct"
        },
        {
          "id": "deleteProduct",
          "label": "Delete A Product",
          "route": "deleteProduct"
        },
        {
          "id": "createProduct",
          "label": "Create A New Product",
          "route": "createProduct"
        },
        {
          "id": "ProductsAdmin",
          "label": "Products Admin",
          "route": "ProductsAdmin"
        }
      ]
    }
  ],
  "ungrouped": []
}
