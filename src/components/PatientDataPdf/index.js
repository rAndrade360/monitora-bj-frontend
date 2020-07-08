import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import questions from '../../utils/questios.json';
import styles from './styles';

const PatientDataPdf = ({ patientData, reportData }) => {
  const [reportItems, setReportItems] = useState({
    questionsLeft: [],
    questionsRight: [],
  });
  useEffect(() => {
    const questionsAux = { questionsLeft: [], questionsRight: [] };
    questions.forEach((question, index) => {
      if (index % 2 === 0) {
        questionsAux.questionsLeft.push(question);
      } else {
        questionsAux.questionsRight.push(question);
      }
    });
    setReportItems(questionsAux);
  }, []);
  return (
    <Document>
      <Page style={styles.body} size="A4">
        <View style={styles.sectionTitleView}>
          <Text style={styles.title}>Ficha individual</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleSection}>Dados Pessoais</Text>
          <View style={styles.dataContainer}>
            <View style={styles.dataViewLeft}>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Nome:</Text>
                <Text>{patientData.name}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Nome da Mãe:</Text>
                <Text>{patientData.monther_name}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Cpf:</Text>
                <Text>{patientData.cpf}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Cns:</Text>
                <Text>{patientData.cns || 'Não informado'}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Telefone:</Text>
                <Text>{patientData.phone_number || 'Não informado'}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Whatsapp:</Text>
                <Text>{patientData.whatsapp || 'Não informado'}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>É estrangeiro?</Text>
                <Text>{patientData.is_foreign ? 'Sim' : 'Não'}</Text>
              </View>
            </View>
            <View style={styles.dataViewLeft}>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>
                  É Profissional de saúde?
                </Text>
                <Text>
                  {patientData.healthcare_professional ? 'Sim' : 'Não'}
                </Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Passaporte:</Text>
                <Text>{patientData.passport || 'Não informado'}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Sexo:</Text>
                <Text>{patientData.genre}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Data de nascimento:</Text>
                <Text>{patientData.birthday}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>País de origem:</Text>
                <Text>{patientData.origin_country}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Data de registro:</Text>
                <Text>{patientData.creation_date}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleSection}>Dados de Endereço</Text>
          <View style={styles.dataContainer}>
            <View style={styles.dataViewLeft}>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Bairro:</Text>
                <Text>{patientData.address || 'Não informado'}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Número:</Text>
                <Text>{patientData.number || 'Não informado'}</Text>
              </View>
            </View>
            <View style={styles.dataViewLeft}>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Logradouro</Text>
                <Text>{patientData.street || 'Não informado'}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Complemento:</Text>
                <Text>{patientData.complement || 'Não informado'}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleSection}>Dados de Saúde</Text>
          <View style={styles.dataContainer}>
            <View style={styles.dataViewLeft}>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Estado de risco:</Text>
                <Text>{patientData.risk}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Status:</Text>
                <Text>{patientData.status}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Data de triagem:</Text>
                <Text>{patientData.screening_day}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>
                  Data de início dos sintomas:
                </Text>
                <Text>{patientData.symptom_onset_date}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Observações:</Text>
                <Text>{patientData.additional_notes || 'Não tem'}</Text>
              </View>
            </View>
            <View style={styles.dataViewLeft}>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Glicemia:</Text>
                <Text>
                  {patientData.blood_glucose
                    ? `${patientData.blood_glucose} mg/dL`
                    : 'Não informado'}
                </Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Pressão arterial:</Text>
                <Text>
                  {patientData.blood_pressure
                    ? `${patientData.blood_pressure} mmHg`
                    : 'Não informado'}
                </Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Temperatura:</Text>
                <Text>
                  {patientData.temperature
                    ? `${patientData.temperature} °C`
                    : 'Não informado'}
                </Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Frequência cardíaca:</Text>
                <Text>
                  {patientData.heart_rate
                    ? `${patientData.heart_rate} bpm`
                    : 'Não informado'}
                </Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Saturação de oxigênio:</Text>
                <Text>
                  {patientData.oxygen_saturation
                    ? `${patientData.oxygen_saturation}%`
                    : 'Não informado'}
                </Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>
                  Contatos intradomiciliares:
                </Text>
                <Text>{patientData.household_contacts || 0}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleSection}>Dados de teste</Text>
          <View style={styles.dataContainer}>
            <View style={styles.dataViewLeft}>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Estado do teste:</Text>
                <Text>{patientData.test_status}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Tipo:</Text>
                <Text>{patientData.test_type}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Data de coleta:</Text>
                <Text>{patientData.collection_date || 'Não coletado'}</Text>
              </View>
            </View>
            <View style={styles.dataViewLeft}>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Resultado:</Text>
                <Text>{patientData.test_result}</Text>
              </View>
              <View style={styles.dataSection}>
                <Text style={styles.propertyTitle}>Classificação final:</Text>
                <Text>{patientData.final_classification}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
      <Page style={styles.body} size="A4">
        <View style={styles.section}>
          <Text style={styles.titleSection}>Sintomas</Text>
          <View style={styles.dataContainer}>
            <View style={styles.dataViewLeft}>
              {reportItems.questionsLeft.map((question) => (
                <View style={styles.dataSection} key={question.id}>
                  <Text style={styles.propertyTitle}>{question.label}</Text>
                  <Text>
                    {reportData[0].report[question.value] ? 'Sim' : 'Não'}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.dataViewLeft}>
              {reportItems.questionsRight.map((question) => (
                <View style={styles.dataSection} key={question.id}>
                  <Text style={styles.propertyTitle}>{question.label}</Text>
                  <Text>
                    {reportData[0].report[question.value] ? 'Sim' : 'Não'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PatientDataPdf;
