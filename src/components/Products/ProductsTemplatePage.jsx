import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import ProductTemplateApp from './ProductsTemplateApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductTemplateApp></ProductTemplateApp>
  </StrictMode>,
)