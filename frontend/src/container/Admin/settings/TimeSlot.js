import React, {useEffect} from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import {Formik, FieldArray} from 'formik';
// reactstrap components
import {Row, Col, Button, FormGroup, UncontrolledTooltip} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import {TimeSlotActions} from '../../../store/actions/TimeSlotActions';
import moment from 'moment';

const TimeSlot = ({location}) => {
  const timeFormat = 'h:mm a';
  const timeFormat24 = 'HH:mm:ss';
  const dispatch = useDispatch();
  const isProgress = useSelector((store) => store?.timeSlots?.isProgress);
  const timeSlots = useSelector((store) => store?.timeSlots?.timeSlots);

  useEffect(() => {
    dispatch(TimeSlotActions.getTimeSlots()); // eslint-disable-next-line
  }, []);

  if (isProgress && timeSlots.length === 0) {
    return <div className="spinner-lg"></div>;
  }

  return (
    <Col xs={12} md={6}>
      <Formik
        onSubmit={async (values) => {
          dispatch(
            TimeSlotActions.editTimeSlots({
              timeslots: values.timeSlots.map((item) => ({
                start: moment('2015-06-17 ' + item.start).format(timeFormat24),
                end: moment('2015-06-17 ' + item.end).format(timeFormat24),
              })),
            }),
          );
        }}
        initialValues={{
          timeSlots,
        }}
        // validationSchema={productValidationSchema}
        validateOnChange={true}>
        {(formBag) => (
          <>
            <Row>
              <Col xs={12} md={5}>
                <label>Start</label>
              </Col>
              <Col xs={12} md={5}>
                End
              </Col>
              <FieldArray
                name={`timeSlots`}
                render={(arrayHelpers) => {
                  return (
                    <>
                      {formBag.values.timeSlots.map((item, index) => {
                        return (
                          <>
                            <Col xs={12} md={5}>
                              <FormGroup>
                                <Datetime
                                  dateFormat={false}
                                  inputProps={{
                                    placeholder: 'Start time',
                                  }}
                                  initialValue={moment(
                                    '2015-06-17 ' +
                                      formBag.values.timeSlots[index].start,
                                  ).format(timeFormat)}
                                  onChange={(value) => {
                                    if (value)
                                      formBag.setFieldValue(
                                        `timeSlots[${index}].start`,
                                        value.format(timeFormat),
                                      );
                                  }}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} md={5}>
                              <FormGroup>
                                <Datetime
                                  dateFormat={false}
                                  inputProps={{
                                    placeholder: 'End time',
                                  }}
                                  initialValue={moment(
                                    '2015-06-17 ' +
                                      formBag.values.timeSlots[index].end,
                                  ).format(timeFormat)}
                                  onChange={(value) => {
                                    if (value)
                                      formBag.setFieldValue(
                                        `timeSlots[${index}].end`,
                                        value.format(timeFormat),
                                      );
                                  }}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} md={2}>
                              <Button
                                className="btn-round btn-icon btn-icon-mini btn-neutral"
                                color="info"
                                id={`del-${index}`}
                                type="button"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}>
                                <i className="fas fa-trash-alt" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target={`del-${index}`}>
                                Remove
                              </UncontrolledTooltip>
                            </Col>
                          </>
                        );
                      })}
                      <Col xs={12} md={12} style={{textAlign: 'center'}}>
                        <Button
                          className="btn-fill btn-sm"
                          color="primary"
                          onClick={() => {
                            arrayHelpers.push({
                              start: '9:00 AM',
                              end: '10:00 AM',
                            });
                          }}>
                          <span>
                            <i className="fas fa-plus"></i>
                          </span>
                        </Button>
                      </Col>
                    </>
                  );
                }}></FieldArray>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Button
                  className="btn-fill"
                  color="primary"
                  onClick={formBag.submitForm}>
                  {formBag.loading ? (
                    <div className="spinner"></div>
                  ) : (
                    <span>Save</span>
                  )}
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Formik>
    </Col>
  );
};

export default TimeSlot;
