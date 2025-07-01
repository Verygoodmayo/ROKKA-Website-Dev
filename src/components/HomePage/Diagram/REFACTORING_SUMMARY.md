# Diagram Component Refactoring Summary

## Overview
The diagram component has been successfully refactored to be more scalable and interactive. The component now features:
- **Dynamic opportunities based on both field AND role selection**
- **Content-only fade animations** (not the entire cards)
- **Comprehensive role-specific opportunity mapping**

## Key Changes Made

### 1. Advanced Data Structure
- **Moved all static data to separate files** in the `data/` folder:
  - `fieldsData.js` - Contains the 4 main fields (Intelligence, Commercial, Political, Research)
  - `rolesData.js` - Contains field-specific roles for each field (9 roles per field)
  - `technologiesData.js` - Contains the 3 technologies (Data Manager, Monitoring, PILA)
  - `opportunitiesData.js` - **NEW NESTED STRUCTURE**: Field → Role → Opportunities

### 2. Complex State Management
- **Enhanced state variables**:
  - `selectedField` - Currently selected field name
  - `selectedRole` - Currently selected role (changes with field)
  - `selectedOpportunity` - Currently selected opportunity (changes with field AND role)
  - Corresponding index states for each selection

### 3. Advanced Interactive Functionality
- **Field selection drives role changes**:
  - When a field is selected, roles update to field-specific roles
  - First role in new field is automatically selected
- **Role selection drives opportunity changes**:
  - When a role is selected, opportunities update to role-specific opportunities
  - First opportunity in new role set is automatically selected
- **Technology remains constant** across all field/role combinations

### 4. Refined Animation Implementation
- **Content-only GSAP fade transitions**:
  - Only the `.description` content fades, not entire cards
  - Role and opportunity descriptions fade when field changes
  - Opportunity descriptions fade when role changes
  - Smooth 0.3s transitions with power2.inOut easing

### 5. Enhanced Component Communication
- **Updated DiagramCard component**:
  - Added `selectedIndex` prop for external control
  - Added `onSelectionChange` callback for parent communication
  - Improved state synchronization with parent component

## Data Structure Examples

### Nested Opportunities Structure
```javascript
opportunitiesData = {
    Intelligence: {
        "Intelligence Analyst": {
            categories: ["Defense Intelligence", "Corporate Security", "Risk Assessment", "Threat Analysis"],
            descriptions: [...]
        },
        "OSINT Specialist": {
            categories: ["Media Monitoring", "Social Intelligence", "Digital Investigation", "Open Source Research"],
            descriptions: [...]
        }
        // ... 7 more roles
    },
    Commercial: {
        "Market Research Analyst": {
            categories: ["Consumer Insights", "Market Intelligence", "Competitive Analysis", "Industry Research"],
            descriptions: [...]
        }
        // ... 8 more roles
    }
    // ... Political and Research fields
}
```

### Roles by Field (9 each)
- **Intelligence**: Intelligence Analyst, OSINT Specialist, Threat Assessment Officer, Data Fusion Analyst, Strategic Intelligence Coordinator, Counterintelligence Analyst, Geospatial Intelligence Analyst, Signals Intelligence Analyst, Human Intelligence Coordinator
- **Commercial**: Market Research Analyst, Business Intelligence Specialist, Competitive Intelligence Manager, Data Scientist, Customer Analytics Coordinator, Strategic Planning Analyst, Revenue Operations Manager, Product Intelligence Lead, Commercial Risk Analyst
- **Political**: Voter Segment Analyst, Field Director, Message Testing Coordinator, Media Monitor, Social Sentiment Analyst, Opposition Researcher, Constituent Response Manager, Campaign Volunteer Coordinator, Policy Advisor
- **Research**: Research Data Analyst, Academic Research Coordinator, Literature Review Specialist, Survey Research Manager, Statistical Analysis Expert, Research Methodology Consultant, Grant Research Analyst, Publication Strategy Coordinator, Collaborative Research Manager

## Technical Implementation

### Enhanced Functions
- `handleFieldChange()` - Manages field selection, triggers role/opportunity cascade updates
- `handleRoleChange()` - Manages role selection, triggers opportunity updates with animation
- `getCurrentRoleData()` - Returns current field's role data
- `getCurrentOpportunityData(field, role)` - Returns specific field+role combination opportunities with fallbacks

### Animation Targeting
- Uses `querySelector('.description')` to target only content areas
- Preserves card structure while animating content
- Smooth transitions between different data states

## User Experience Flow

1. **User selects a Field** (e.g., "Commercial")
   - Roles update to Commercial-specific roles
   - First role ("Market Research Analyst") auto-selected
   - Opportunities update to "Market Research Analyst" opportunities
   - Content fades smoothly during transition

2. **User selects a different Role** (e.g., "Data Scientist")
   - Opportunities update to "Data Scientist" opportunities
   - First opportunity auto-selected
   - Only opportunity content fades during transition

3. **User selects Technology** 
   - No cascade effects (technologies remain constant)

4. **User selects Opportunity**
   - Independent selection within current field+role context

## Benefits of Enhanced Refactoring

1. **Complex Interactivity**: Field and role selections create cascading updates
2. **Granular Content**: 4 fields × 9 roles × 4 opportunities = 144 unique opportunity descriptions
3. **Smooth UX**: Content-only animations preserve layout stability
4. **Scalable Architecture**: Easy to add new fields, roles, or opportunities
5. **Intelligent Fallbacks**: Graceful handling of missing data combinations
6. **Performance**: Efficient state management and selective animations

## Default State
- Starts with **Political** field selected
- Default role: "Voter Segment Analyst"
- Default technology: "Data Manager"
- Default opportunity: "Campaign Analytics"

The component now provides a sophisticated, multi-layered exploration experience that guides users through ROKKA's technology offerings based on their specific field and role!
