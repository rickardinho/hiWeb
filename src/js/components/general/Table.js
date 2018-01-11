import React from 'react';
import { Container, Row, Col } from 'react-pure-grid';

export const Table = (rowData) => {

    let mappedRowData = rowData.map((data, i) => {
        return (
          <Row>
              <Col xs={12} md={6}>
                  { data.col1 }
              </Col>
              <Col xs={12} md={6}>
                  { data.col2 }
              </Col>
          </Row>

        );
    });

    return (
            <Container>
                {
                    mappedRowData
                }
             </Container>

    );
};
