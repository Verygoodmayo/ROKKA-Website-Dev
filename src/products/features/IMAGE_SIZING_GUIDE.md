# Feature Image Sizing System

## Overview
The FeaturesContainer now supports individual image sizing control for each feature across all pages with **page-specific SCSS classes** for maximum customization.

## How It Works

### 1. Page-Specific Classes (Recommended)
Each page and feature combination has its own dedicated CSS class in `FeaturesContainer.scss`:

```scss
// DATA MANAGER PAGE
&.data-manager-feature-1 { /* Prediction Models */ }
&.data-manager-feature-2 { /* Database Aggregation */ }
&.data-manager-feature-3 { /* Segmentation */ }
&.data-manager-feature-4 { /* Visualization */ }

// MONITORING PAGE  
&.monitoring-feature-1 { /* Objective Oriented Approach */ }
&.monitoring-feature-2 { /* Monitor Any Source */ }
&.monitoring-feature-3 { /* Data Collection (Tracker) */ }
&.monitoring-feature-4 { /* Post Analysis */ }

// PILA PAGE
&.pila-feature-1 { /* RAG */ }
&.pila-feature-2 { /* Action Items */ }
&.pila-feature-3 { /* PILA Mobile App */ }
&.pila-feature-4 { /* Agents */ }

// PLUGINS PAGE
&.plugins-feature-1 { /* API */ }
&.plugins-feature-2 { /* AI Driven Call Center */ }
&.plugins-feature-3 { /* Ecosystem Analyzer */ }
&.plugins-feature-4 { /* Mobile Command */ }
&.plugins-feature-5 { /* Distribution Pad */ }
&.plugins-feature-6 { /* Parliament Regulation Dashboard */ }
&.plugins-feature-7 { /* Hate Speech Detector */ }
```

### 2. Generic Classes (Fallback)
Still available for general use:

#### `image-portrait`
- **Use for**: Images where height > width
- **Behavior**: Full height of container, auto width
- **Object-fit**: `contain` (maintains aspect ratio)

#### `image-landscape` 
- **Use for**: Images where width > height
- **Behavior**: Fits width with padding on left/right (30px each)
- **Object-fit**: `contain` (maintains aspect ratio)
- **Padding**: Uses `$size3` variable (30px)

#### `image-square`
- **Use for**: Images where height = width
- **Behavior**: Same as portrait (full height, auto width)
- **Object-fit**: `contain` (maintains aspect ratio)

#### `image-default` (fallback)
- **Use for**: When no class is specified
- **Behavior**: Full height, auto width with cover
- **Object-fit**: `cover` (may crop image)

## Editing Individual Images

### Method 1: Direct SCSS Editing (Recommended)
Edit the specific class in `FeaturesContainer.scss`:

```scss
&.data-manager-feature-1 {
    // Customize Prediction Models image
    width: 90%;
    height: auto;
    max-height: 80%;
    object-fit: contain;
    margin: vars.$size2;
    border-radius: 10px;
    // Any custom styling you want!
}

&.monitoring-feature-3 {
    // Customize Data Collection image
    width: auto;
    height: 90%;
    object-fit: cover;
    filter: brightness(1.1);
    // Any custom styling you want!
}
```

### Method 2: Feature Data Configuration (Legacy)
Still supported for backward compatibility:

```javascript
const feature1 = {
  title: "Feature Title",
  description: "Feature description...",
  image: featureSvg,
  imageClass: "image-portrait", // Fallback if page-specific not found
  byNeed: { ... }
}
```

## Current Page-Specific Configurations

### Data Manager (`/data-manager`)
- **Feature 1** (Prediction Models): `data-manager-feature-1`
- **Feature 2** (Database Aggregation): `data-manager-feature-2` 
- **Feature 3** (Segmentation): `data-manager-feature-3`
- **Feature 4** (Visualization): `data-manager-feature-4`

### Monitoring (`/monitoring`)
- **Feature 1** (Objective Oriented): `monitoring-feature-1`
- **Feature 2** (Monitor Any Source): `monitoring-feature-2`
- **Feature 3** (Data Collection): `monitoring-feature-3`
- **Feature 4** (Post Analysis): `monitoring-feature-4`

### PILA (`/pila`)
- **Feature 1** (RAG): `pila-feature-1`
- **Feature 2** (Action Items): `pila-feature-2`
- **Feature 3** (Mobile App): `pila-feature-3`
- **Feature 4** (Agents): `pila-feature-4`

### Plugins (`/plugins`)
- **Feature 1** (API): `plugins-feature-1`
- **Feature 2** (AI Call Center): `plugins-feature-2`
- **Feature 3** (Ecosystem Analyzer): `plugins-feature-3`
- **Feature 4** (Mobile Command): `plugins-feature-4`
- **Feature 5** (Distribution Pad): `plugins-feature-5`
- **Feature 6** (Parliament Dashboard): `plugins-feature-6`
- **Feature 7** (Hate Speech Detector): `plugins-feature-7`

## Examples

### Customize a Specific Image
```scss
&.monitoring-feature-2 {
    // Make Monitor Any Source image smaller with rounded corners
    width: 80%;
    height: auto;
    max-height: 85%;
    object-fit: contain;
    margin: vars.$size2;
    border-radius: vars.$size1;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
```

### Different Styling Per Page
```scss
// Data Manager - Professional look
&.data-manager-feature-1 {
    width: 95%;
    object-fit: contain;
    filter: contrast(1.1);
}

// Monitoring - Dynamic look  
&.monitoring-feature-1 {
    width: 85%;
    object-fit: cover;
    border-radius: 8px;
    transform: scale(1.05);
}
```

## Technical Details
- **Auto-detection**: Component automatically detects page from URL path
- **Class Priority**: Page-specific classes override generic classes
- **Container**: `.features-image` (600px width, 100vh height, overflow hidden)
- **Padding Variable**: `vars.$size3` (30px) for landscape images
- **Fallback**: Graceful fallback to `imageClass` property if page not detected
