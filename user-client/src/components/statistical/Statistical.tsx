import { Card, Col, Row } from "antd";
import React, { FC } from "react";

interface Props {
  title_1: string;
  content_1: string | number;
  title_2: string;
  content_2: string | number;
  title_3: string;
  content_3: string | number;
}

const Statistical: FC<Props> = (prop) => {
  return (
    <>
      {" "}
      <Row gutter={16}>
        <Col span={8}>
          <Card title={prop.title_1} bordered={false}>
            {prop.content_1}
          </Card>
        </Col>
        <Col span={8}>
          <Card title={prop.title_2} bordered={false}>
            {prop.content_2}
          </Card>
        </Col>
        <Col span={8}>
          <Card title={prop.title_3} bordered={false}>
            {prop.content_3}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Statistical;
