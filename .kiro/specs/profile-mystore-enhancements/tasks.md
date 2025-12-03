# Implementation Plan

## Phase 1: Foundation & Shared Components

- [-] 1. Create ProfileSidebarComponent

  - [x] 1.1 Create component files (ts, html, css)


    - Define MenuItem interface with id, label, icon, route, isSpecial, saleEventName
    - Implement menu items: Sale, Thông tin cá nhân, Giỏ hàng, Sản phẩm yêu thích, Vouchers, Đơn hàng, Cửa hàng của tôi
    - Add user avatar and name display at top
    - Add Settings and Logout at bottom
    - _Requirements: 5.1, 5.2, 5.5_

  - [ ] 1.2 Implement Sale menu item with special styling
    - Show sale event name when active (e.g., "11/11")
    - Show "Sale" as default when no active event
    - Add decorative styling for sale events

    - _Requirements: 5.3, 5.4_
  - [ ] 1.3 Style sidebar with design system CSS variables
    - Use --bg-card, --text-primary, --border-default
    - Implement active state with --color-primary
    - Add hover effects with --bg-hover
    - _Requirements: 2.1, 2.3, 6.2_

- [x] 2. Update Profile Page to use shared sidebar


  - [x] 2.1 Import and integrate ProfileSidebarComponent

    - Replace inline sidebar with shared component
    - Pass user data and active route
    - _Requirements: 1.1, 2.1_

  - [ ] 2.2 Fix color theme consistency
    - Replace hardcoded colors with CSS variables
    - Ensure dark mode compatibility
    - _Requirements: 2.1, 2.2_

- [ ] 3. Update My Store Page layout
  - [x] 3.1 Show sidebar when user has no store

    - Display sidebar alongside "Create Store" content
    - Highlight "Cửa hàng của tôi" as active
    - _Requirements: 1.1, 1.2_

  - [ ] 3.2 Fix color theme and styling
    - Use design system CSS variables
    - Match website color scheme

    - _Requirements: 2.1, 2.2_
  - [x] 3.3 Add mobile responsive navigation

    - Collapsible sidebar or bottom nav for mobile
    - _Requirements: 1.3_

- [ ] 4. Checkpoint - Ensure sidebar and layout work correctly
  - Ensure all tests pass, ask the user if questions arise.

## Phase 2: Address Management System

- [x] 5. Create LocationService for Vietnam addresses



  - [x] 5.1 Create service with mock data

    - Define Province, District, Ward interfaces
    - Add mock data for provinces, districts, wards
    - Implement getProvinces(), getDistrictsByProvince(), getWardsByDistrict()
    - _Requirements: 3.6, 3.7_
  - [x] 5.2 Write property test for cascading filter


    - **Property 3: Cascading Province-District Filter**
    - **Property 4: Cascading District-Ward Filter**
    - **Validates: Requirements 3.6, 3.7**

- [ ] 6. Create AddressCardComponent
  - [ ] 6.1 Create component with address display
    - Show recipient name, phone, full address
    - Display "Mặc định" badge for default address
    - _Requirements: 3.1, 3.2_
  - [ ] 6.2 Add action buttons (edit, set default, delete)
    - Use material-symbols-outlined icons
    - Add hover effects and loading states
    - _Requirements: 3.3, 6.1, 6.3_

- [ ] 7. Create AddressFormModalComponent
  - [ ] 7.1 Create modal with cascading selects
    - Province select with search
    - District select filtered by province
    - Ward select filtered by district
    - Street address input
    - _Requirements: 3.4, 3.5, 3.6, 3.7_
  - [ ] 7.2 Add Google Maps placeholder section
    - Reserve space for future Google Maps integration
    - Add "Chọn từ bản đồ" button (disabled)
    - _Requirements: 3.8_
  - [ ] 7.3 Implement form validation and save
    - Validate required fields
    - Show loading state on save
    - _Requirements: 6.3, 6.5_

- [ ] 8. Update UserService for address management
  - [ ] 8.1 Extend User model with addresses array
    - Add addresses: Address[] field
    - Add defaultAddressId field
    - _Requirements: 3.1, 3.2_
  - [ ] 8.2 Implement address CRUD methods
    - addAddress(), updateAddress(), deleteAddress()
    - setDefaultAddress()
    - _Requirements: 3.3, 3.4, 3.5_
  - [ ] 8.3 Write property test for default address ordering
    - **Property 2: Default Address Ordering**
    - **Validates: Requirements 3.2**

- [ ] 9. Integrate address management into Profile page
  - [ ] 9.1 Replace address inputs with address list
    - Display AddressCard for each address
    - Sort with default address first
    - _Requirements: 3.1, 3.2_
  - [ ] 9.2 Add "Thêm địa chỉ mới" button
    - Open AddressFormModal on click
    - _Requirements: 3.5_
  - [ ] 9.3 Wire up edit, delete, set default actions
    - Connect to UserService methods
    - Show success/error feedback
    - _Requirements: 3.3, 3.4, 6.4_

- [ ] 10. Checkpoint - Ensure address management works
  - Ensure all tests pass, ask the user if questions arise.

## Phase 3: Avatar Management

- [ ] 11. Create AvatarPickerModalComponent
  - [ ] 11.1 Create modal with preset avatar grid
    - Display 8-12 preset avatar options
    - Highlight currently selected avatar
    - _Requirements: 4.2_
  - [ ] 11.2 Add upload option below presets
    - File input accepting jpg, jpeg, png, webp, gif
    - Show file type validation error
    - _Requirements: 4.3, 4.4_
  - [ ] 11.3 Write property test for file type validation
    - **Property 5: Avatar File Type Validation**
    - **Validates: Requirements 4.4**
  - [ ] 11.4 Implement avatar preview update
    - Update preview immediately on selection
    - _Requirements: 4.5_

- [ ] 12. Add avatar edit button to Profile page
  - [ ] 12.1 Add edit overlay on avatar image
    - Show camera/edit icon on hover
    - Open AvatarPickerModal on click
    - _Requirements: 4.1_
  - [ ] 12.2 Connect avatar selection to UserService
    - Update user avatar on selection
    - _Requirements: 4.5_

- [ ] 13. Checkpoint - Ensure avatar management works
  - Ensure all tests pass, ask the user if questions arise.

## Phase 4: UX Polish & Theme Consistency

- [ ] 14. Apply consistent styling across pages
  - [ ] 14.1 Audit and fix all hardcoded colors
    - Replace with CSS variables from theme.css
    - Test in both light and dark modes
    - _Requirements: 2.1, 2.2_
  - [ ] 14.2 Write property test for theme consistency
    - **Property 1: Theme Color Consistency**
    - **Validates: Requirements 2.2**

- [ ] 15. Add loading states and feedback
  - [ ] 15.1 Add loading spinners for async operations
    - Address save/delete operations
    - Avatar upload
    - _Requirements: 6.3_
  - [ ] 15.2 Add success/error toast notifications
    - Show confirmation on successful actions
    - Show error messages on failures
    - _Requirements: 6.4_

- [ ] 16. Final Checkpoint - Ensure all features work
  - Ensure all tests pass, ask the user if questions arise.
