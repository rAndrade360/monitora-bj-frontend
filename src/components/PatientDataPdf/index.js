import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
const PatientDataPdf = () => {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text>Dados pessoais</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PatientDataPdf;
