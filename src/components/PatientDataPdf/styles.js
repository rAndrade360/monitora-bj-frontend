import RobotoRegular from '../../assets/fonts/Roboto-Regular.ttf';
import RobotoMedium from '../../assets/fonts/Roboto-Medium.ttf';
import RobotoBold from '../../assets/fonts/Roboto-Medium.ttf';
import { StyleSheet, Font } from '@react-pdf/renderer';
Font.register({
  family: 'Roboto',
  fonts: [
    { src: RobotoRegular, fontWeight: 'regular' },
    { src: RobotoMedium, fontWeight: 'medium' },
    { src: RobotoBold, fontWeight: 'bold' },
  ],
});
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 12,
  },
  sectionTitleView: {
    margin: 10,
    padding: 10,
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    color: '#666',
    fontSize: '16px',
  },
  titleSection: {
    fontWeight: 'medium',
    color: '#444',
    fontSize: '14px',
    marginBottom: '2px',
    alignSelf: 'center',
  },
  dataViewLeft: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '50%',
  },
  dataViewRight: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '50%',
  },
  dataSection: {
    margin: '3px',
    marginHorizontal: '30px',
  },
  dataContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  propertyTitle: {
    fontSize: '10px',
    color: '#333',
    fontWeight: 'medium',
  },
});

export default styles;
