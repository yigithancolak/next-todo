'use client'

import { HydrateProps, Hydrate as RQHydrate } from '@tanstack/react-query'

export default function Hydrate(props: HydrateProps) {
  return <RQHydrate {...props} />
}
