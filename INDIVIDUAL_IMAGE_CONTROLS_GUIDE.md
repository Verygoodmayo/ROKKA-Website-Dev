# Individual Image Controls - Page-Specific SCSS

## Overview
Each page now has individual image controls in their respective SCSS files. You can customize each feature image directly in the page's stylesheet.

## Files & Controls

### 📊 Data Manager (`/src/styles/pages/data_manager/data_manager.scss`)
```scss
.features-image {
    img {
        &.data-manager-feature-1 { /* Prediction Models */ }
        &.data-manager-feature-2 { /* Database Aggregation */ }
        &.data-manager-feature-3 { /* Segmentation */ }
        &.data-manager-feature-4 { /* Visualization */ }
    }
}
```

### 🔍 Monitoring (`/src/styles/pages/monitoring/monitoring.scss`)
```scss
.features-image {
    img {
        &.monitoring-feature-1 { /* Objective Oriented Approach */ }
        &.monitoring-feature-2 { /* Monitor Any Source */ }
        &.monitoring-feature-3 { /* Data Collection (Tracker) */ }
        &.monitoring-feature-4 { /* Post Analysis */ }
    }
}
```

### 🤖 PILA (`/src/styles/pages/PILA/PILA.scss`)
```scss
.features-image {
    img {
        &.pila-feature-1 { /* RAG */ }
        &.pila-feature-2 { /* Action Items */ }
        &.pila-feature-3 { /* PILA Mobile App */ }
        &.pila-feature-4 { /* Agents */ }
    }
}
```

### 🔌 Plugins (`/src/styles/pages/plugins/plugins.scss`)
```scss
#plugins-features {
    .features-image {
        img {
            &.plugins-feature-1 { /* API */ }
            &.plugins-feature-2 { /* AI Driven Call Center */ }
            &.plugins-feature-3 { /* Ecosystem Analyzer */ }
            &.plugins-feature-4 { /* Mobile Command */ }
            &.plugins-feature-5 { /* Distribution Pad */ }
            &.plugins-feature-6 { /* Parliament Regulation Dashboard */ }
            &.plugins-feature-7 { /* Hate Speech Detector */ }
        }
    }
}
```

## Examples

### 1. Add rounded corners to Data Manager's first image
```scss
&.data-manager-feature-1 {
    width: auto;
    height: 100%;
    object-fit: contain;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
```

### 2. Make Monitoring's second image smaller with padding
```scss
&.monitoring-feature-2 {
    width: 80%;
    height: auto;
    max-height: 90%;
    object-fit: contain;
    margin: vars.$size2;
    padding: vars.$size1;
}
```

### 3. Add hover effect to PILA's mobile app image
```scss
&.pila-feature-3 {
    width: auto;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: scale(1.05);
    }
}
```

### 4. Custom styling for Plugins API image
```scss
&.plugins-feature-1 {
    width: auto;
    height: 95%;
    object-fit: contain;
    filter: brightness(1.1);
    border: 2px solid rgba(255,255,255,0.1);
    border-radius: 8px;
}
```

## Available CSS Properties
You can use any CSS properties for styling:

- **Sizing**: `width`, `height`, `max-width`, `max-height`
- **Positioning**: `margin`, `padding`, `transform`
- **Visual**: `border-radius`, `box-shadow`, `filter`, `opacity`
- **Fit**: `object-fit` (contain, cover, fill, scale-down)
- **Animation**: `transition`, `animation`, `:hover` effects
- **Background**: `background`, `border`

## Available Variables
Use your SCSS variables for consistency:

- `vars.$size1` (10px) through `vars.$size8` (120px)
- `vars.$bg` (background color)
- `vars.$content` (text color)
- `vars.$border5` (light border)
- `vars.$p-color` (primary color)

## Priority System
1. **Page-specific controls** (highest priority)
2. Global FeaturesContainer.scss controls
3. Generic image classes (fallback)

## Best Practices
- Keep styling consistent within each page
- Use variables instead of hard-coded values
- Test on different screen sizes
- Comment your custom styles for clarity
