"use client";

import { useDispatch } from "react-redux";

const Board = () => {
  const dispatch = useDispatch();
  return (
    <div>
      Hello board ./rop-frontend/src/app/globals.scss.css [Client Component
      Browser] ./rop-frontend/src/app/layout.tsx [Server Component] ⚠
      ./rop-frontend/src/components/ui/SegmentControl/SegmentControl.module.scss
      Issue while running loader SassWarning: Deprecation Warning on line 9,
      column 9 of
      file:///D:/my_code/2026/april/rop-frontend/src/styles/_responsive.scss:9:9:
      Global built-in functions are deprecated and will be removed in Dart Sass
      3.0.0. Use map.get instead. More info and automated migrator:
      https://sass-lang.com/d/import 9 | $size: map-get($breakpoints,
      $breakpoint); src\styles\_responsive.scss 10:10 respond()
      src\components\ui\SegmentControl\SegmentControl.module.scss 13:3 root
      stylesheet Import traces: Client Component Browser:
      ./rop-frontend/src/components/ui/SegmentControl/SegmentControl.module.scss
      [Client Component Browser]
      ./rop-frontend/src/components/ui/SegmentControl/SegmentControl.tsx [Client
      Component Browser] ./rop-frontend/src/app/(workspace)/workspace/layout.tsx
      [Client Component Browser]
      ./rop-frontend/src/app/(workspace)/workspace/layout.tsx [Server Component]
      Client Component SSR:
      ./rop-frontend/src/components/ui/SegmentControl/SegmentControl.module.scss
      [Client Component SSR]
      ./rop-frontend/src/components/ui/SegmentControl/SegmentControl.tsx [Client
      Component SSR] ./rop-frontend/src/app/(workspace)/workspace/layout.tsx
      [Client Component SSR]
      ./rop-frontend/src/app/(workspace)/workspace/layout.tsx [Server Component]
      [next-auth][warn][NEXTAUTH_URL]
      https://next-auth.js.org/warnings#nextauth_url
      [next-auth][warn][NO_SECRET] https://next-auth.js.org/warnings#no_secret
      GET /api/auth/session 200 in 194ms (next.js: 153ms, application-code:
      41ms)
    </div>
  );
};

export default Board;
