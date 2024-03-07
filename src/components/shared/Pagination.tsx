import Button from './Button'
import Flex from './Flex'
import Spacing from './Spacing'

const Pagination = ({ total, limit, page, setPage }: any) => {
  const numPages = Math.ceil(total / limit)

  const handlePageBtn = (e: any, i: any) => {
    setPage(i + 1)
  }

  return (
    <>
      <Flex justify={'center'} align={'center'}>
        <Button
          color="grey"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </Button>
        <Spacing size={50} direction={'horizontal'} />

        {Array(numPages)
          .fill(10)
          .map((_, i) => (
            <>
              <Button
                value={i}
                key={i + 1}
                color={'pink'}
                onClick={(e) => handlePageBtn(e, i)}
              >
                {i + 1}
              </Button>
              <Spacing key={i} size={10} direction={'horizontal'} />
            </>
          ))}
        <Spacing size={50} direction={'horizontal'} />
        <Button
          color="grey"
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
        >
          &gt;
        </Button>
      </Flex>
    </>
  )
}

export default Pagination
