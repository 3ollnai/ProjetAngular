My Shop — minimal front-end

- Start the app: npm run start (uses existing project start script)
- Run Storybook: npm run storybook (may require Storybook to be initialized)
- State: NgRx store under `src/app/state/` (auth + products)
- API: MSW mock is enabled in `main.ts` when `environment.useMsw` is true; `ShopApiService` calls endpoints under `/api/*`.
- Pages: `LoginPageComponent` (`/login`), `ProductsPageComponent` (`/shop/products`), `ProductRatingPageComponent` (`/shop/rating`). Use `AppPlaceholderComponent` links to navigate.
- Storybook stories: `src/app/components/*stories.ts` — ProductCard, ProductsList, LoginForm.

Notes:
- This is a minimal scaffold: ensure dependencies are installed (Angular Material, NgRx, Storybook). Use the suggested install commands in the original task if missing.
- Bonus: token refresh is sketched in effects; the interceptor is not required but recommended.
