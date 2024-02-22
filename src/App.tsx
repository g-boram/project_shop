import Button from './components/shared/Button'
import { useAlertContext } from './contexts/AlertContext'

function App() {
  const { open } = useAlertContext()

  return (
    <div>
      <Button
        onClick={() => {
          open({
            title: '알림창 열기',
            description: 'description',
            onButtonClick: () => {
              //
            },
          })
        }}
      >
        Alert 오픈
      </Button>
    </div>
  )
}

export default App
