import { useGlobalStore } from '../stores/GlobalStateProvider';
import { GetServerSideProps } from 'next';
import PublicBooksPage from '../components/pages/public-books/PublicBooksPage';

interface Props {
  books: any[];
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: {
      books: [{ name: 'a' }, { name: 'b' }],
    },
  };
};

const PublicBooks: React.FunctionComponent<any> = (props: Props) => {
  const { booksStore } = useGlobalStore();
  booksStore.setBooks(props.books);
  return <PublicBooksPage />;
};

export default PublicBooks;
