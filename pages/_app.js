import PitchProvider from '@/store/pitch-context'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <PitchProvider>
      <Component {...pageProps} />
    </PitchProvider>
  )
}
