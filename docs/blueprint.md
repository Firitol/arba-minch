# **App Name**: ArbaHouse Hub

## Core Features:

- Secure User Authentication & Role Management: Implement Firebase Authentication for user login, along with a robust role-based access control system to differentiate between Mayor and Staff Worker permissions across the application.
- House Holder Information Management (CRUD): Provide user-friendly forms for adding new householder records, including unique house numbers, personal details, and precise GPS coordinates chosen via an integrated map picker. Allow authorized users to easily edit and update existing records.
- House Holder Search, List & Filtering: Present a comprehensive list of all householders, offering fast and efficient search capabilities by house number or full name, alongside dynamic filtering by Kebele/Area to quickly locate specific information.
- House Holder Data Deletion: Enable secure deletion of householder records with a mandatory confirmation step. This functionality will be strictly enforced through role-based permissions, accessible only to authorized Mayor and Staff Worker accounts.
- Interactive Google Map Display: Visually represent all registered householders as interactive markers on a Google Map. Clicking a marker will display key information such as the householder's name, house number, and phone number directly on the map interface.
- Emergency Location Finder: A dedicated tool allowing quick search of householders by number. Upon selection, the map will instantly zoom to the property's location and highlight it, facilitating rapid response for emergency situations.

## Style Guidelines:

- Color Palette: A light-themed scheme inspired by the lush landscapes of Arba Minch. The primary color is a tranquil green (#49B349), chosen to convey reliability and connection to nature. The background features a subtle, desaturated light green (#EDF4ED), creating a calm and professional canvas for information display. An accent of a bright yellowish-green (#A6DE6B) will highlight interactive elements and provide clear visual cues.
- Body and Headline Font: 'Inter', a contemporary sans-serif font known for its clarity, legibility, and modern aesthetic. It is ideal for an administrative system requiring easy readability of numerical data and text-heavy information in various contexts such as forms and tables.
- Iconography: Utilize a consistent set of clean, outline-style icons. These icons will provide intuitive visual navigation and reinforce user actions for tasks like adding, editing, deleting, and searching, ensuring clarity and ease of use across the application.
- Layout: A structured and responsive dashboard with persistent sidebar navigation for efficient access to all features. Data will be organized using clean cards and tabular displays for lists, ensuring an optimal viewing experience across diverse screen sizes.
- Animation: Incorporate subtle, non-intrusive animations primarily to provide visual feedback for user interactions (e.g., form submissions, data updates) and smooth transitions for map operations (e.g., zooming and panning), enhancing the overall user experience.