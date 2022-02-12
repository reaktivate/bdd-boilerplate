import { Container, Input } from 'reactstrap';
import { BooksController } from './PublicBooksPage.ctrl';
import { observer } from 'mobx-react';
import { useControllerState } from '../../../lib/hooks/useControllerState';

const PublicBooksPage = observer(() => {
  const [controller] = useControllerState(new BooksController());

  return (
    <>
      <Container className="mt--8 pb-5">
        <Input value={controller.filterByName} onChange={(e) => controller.setFilter(e.target.value)} />
        {controller.visibleBooks.map((book, i) => (
          <div key={i}>{book.name}</div>
        ))}
      </Container>
    </>
  );
});

export default PublicBooksPage;
