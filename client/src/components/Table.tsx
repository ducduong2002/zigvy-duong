
import { Form, Table } from "antd";

interface AntDTableProps {
  Editable: any;
  columns: any;
  data: any;
  form: any;
  page: number;
  current: number;
  limit: number;
  total: number;
  handlePaginationChange: (newPage: number, newLimit: number) => void;
}

const AntDTable: React.FC<AntDTableProps> = ({
  data,
  columns,
  Editable,
  form,
  page,
  limit,
  total,
  handlePaginationChange,
}) => {
  return (
    <div>
      <Form form={form} component={false}>
        <Table
          className="relative"
          components={{
            body: { cell: Editable },
          }}
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
          rowKey="_id"
          pagination={{
            current: page,
            pageSize: limit,
            total: total,
            onChange: handlePaginationChange,
            showTotal: (total, pageSize) => (
              <div className="absolute bottom-2 left-2 text-gray-500 text-sm">
                Showing {pageSize[0]} to {pageSize[1]} of {total} results
              </div>
            ),
          }}
        />
      </Form>
    </div>
  );
};

export default AntDTable;
