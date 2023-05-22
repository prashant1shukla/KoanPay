import React from 'react';
import { MDBBreadcrumb, MDBBreadcrumbItem } from 'mdb-react-ui-kit';

export default function BreadcrumbView() {
  return (
    <>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>
          <a href='#'>Home</a>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>View</MDBBreadcrumbItem>
      </MDBBreadcrumb>
    </>
  );
}