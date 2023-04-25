import Link from 'next/link';

import { Button } from '@/button/Button';
import { DetailTable } from '@/table/DetailTable';

const Table = () => (
  <DetailTable
    head={
      <tr>
        <th>Name</th>
        <th>Title</th>
        <th>Member since</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    }
    buttons={
      <>
        <Link href="/">
          <Button sm secondary>
            Export
          </Button>
        </Link>

        <Link href="/">
          <Button sm>New User</Button>
        </Link>
      </>
    }
    pagination={{
      stats: '1 - 10 of 350',
      current: 2,
      nbPage: 5,
      href: '/tables',
    }}
  >
    <tr>
      <td>John Doe</td>
      <td>Software Engineer</td>
      <td>12/09/2020</td>
      <td>Active</td>
      <td>
        <Link href="/">Edit</Link>
      </td>
    </tr>

    <tr>
      <td>John Doe</td>
      <td>Software Engineer</td>
      <td>12/09/2020</td>
      <td>Active</td>
      <td>
        <Link href="/">Edit</Link>
      </td>
    </tr>

    <tr>
      <td>John Doe</td>
      <td>Software Engineer</td>
      <td>12/09/2020</td>
      <td>Active</td>
      <td>
        <Link href="/">Edit</Link>
      </td>
    </tr>

    <tr>
      <td>John Doe</td>
      <td>Software Engineer</td>
      <td>12/09/2020</td>
      <td>Active</td>
      <td>
        <Link href="/">Edit</Link>
      </td>
    </tr>

    <tr>
      <td>John Doe</td>
      <td>Software Engineer</td>
      <td>12/09/2020</td>
      <td>Active</td>
      <td>
        <Link href="/">Edit</Link>
      </td>
    </tr>

    <tr>
      <td>John Doe</td>
      <td>Software Engineer</td>
      <td>12/09/2020</td>
      <td>Active</td>
      <td>
        <Link href="/">Edit</Link>
      </td>
    </tr>
  </DetailTable>
);

export { Table };
