import React from 'react';
import 'date-fns';
import * as Yup from 'yup';
import { Grid, Typography, Button, FormHelperText } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Formik, Form } from 'formik';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { append, curry, remove } from 'ramda';
import { ICV, Template } from 'models/cv';
import {
  EducationEntity,
  LanguageEntity,
  ProjectEntity,
  SocialLinksEntity,
} from 'entities/CVEntity';
import AddSection from './AddSection';
import CustomTextField from './CustomTextField';
import MemoDatePicker from './MemoDatePicker';
import CustomSelect from './CustomSelect';
import CustomAutocomplete from './CustomAutocomplete';

type Props = {
  initialValues: ICV;
  submitHandler: (values: ICV) => Promise<void>;
  validationSchema?: Yup.ObjectSchema
};

/* validation schema */
const initialValidationSchema: Yup.ObjectSchema = Yup.object<ICV>().shape({
  cvName: Yup.string().required('Required'),
  jobTitle: Yup.string().required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email!'),
  dateOfBirth: Yup.date().nullable(),
  skype: Yup.string(),
  phone: Yup.string(),
  professionalSummary: Yup.string().required('Required'),
  skills: Yup.array(Yup.string()),
  programmingLanguages: Yup.array(Yup.string()).required('Required'),
  frameworksAndLibraries: Yup.array(Yup.string()).required('Required'),
  technologiesAndDatabases: Yup.array(Yup.string()).required('Required'),
  vcs: Yup.array(Yup.string()).required('Required'),
  others: Yup.array(Yup.string()).required('Required'),
  os: Yup.array(Yup.string()).required('Required'),
  certifications: Yup.string(),
  education: Yup.array().of(
    Yup.object().shape({
      school: Yup.string().required('Required'),
      degree: Yup.string().required('Required'),
      educationStartDate: Yup.date(),
      educationEndDate: Yup.date(),
    })
  ),
  socialLinks: Yup.array().of(
    Yup.object().shape({
      link: Yup.string().required('Required'),
      label: Yup.string().required('Required'),
    })
  ),
  languages: Yup.array().of(
    Yup.object().shape({
      language: Yup.string().required('Required'),
      spoken: Yup.string().required('Required'),
      written: Yup.string().required('Required'),
    })
  ),
  hobby: Yup.string(),
  projects: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
      projectStartDate: Yup.date(),
      projectEndDate: Yup.date(),
      projectDescription: Yup.string().required('Required'),
      position: Yup.string().required('Required'),
      responsibilities: Yup.string().required('Required'),
      tools: Yup.array(Yup.string()).required('Required'),
    })
  ),
});

/* use styles from ui library */
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      [theme.breakpoints.down('sm')]: {
        padding: '0 60px'
      },
      [theme.breakpoints.down('xs')]: {
        padding: '0 15px'
      }
    },
    formField: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    formSection: {
      marginTop: theme.spacing(4),
    },
  })
);

function CVForm({ initialValues, submitHandler, validationSchema }: Props) {
  const classes = useStyles();
  const skills = [
    {
      id: 'skills',
      label: 'Skills'
    },
    {
      id: 'programmingLanguages',
      label: 'Programming languages',
    },
    {
      id: 'frameworksAndLibraries',
      label: 'Frameworks/Libraries',
    },
    {
      id: 'technologiesAndDatabases',
      label: 'Technologies/Databases',
    },
    {
      id: 'vcs',
      label: 'Version control system',
    },
    {
      id: 'others',
      label: 'Others',
    },
    {
      id: 'os',
      label: 'OS',
    },
  ];
  const socialLinksList = ['github', 'linkedin', 'bitbucket'];
  const levels = [
    'beginner',
    'elementary',
    'intermediate',
    'upper-intermediate',
    'advanced',
    'proficiency',
  ];
  const finalValidationSchema = validationSchema
    ? initialValidationSchema.concat(validationSchema)
    : initialValidationSchema;

  /* render */
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={finalValidationSchema}
      onSubmit={submitHandler}
    >
      {({ values, setFieldValue, errors }) => {
        const handleSectionActions = curry(
          (name: string, template: Template) => ({
            handleRemoveSection(i: number) {
              return setFieldValue(name, remove(i, 1, values[name]));
            },
            handleAddSection() {
              return setFieldValue(name, append(template, values[name]));
            },
          })
        );
        return (
          <Form>
            <Grid
              container
              spacing={2}
              className={classes.root}
            >
              <Grid
                item
                xs={12}
              >
                <CustomTextField
                  name="cvName"
                  fullWidth
                  variant="outlined"
                  label="Name of your cv"
                  className={classes.formField}
                />
              </Grid>

              {/* personal details */}
              <Grid
                item
                className={classes.formSection}
                component={Typography}
                variant="h6"
                xs={12}
              >
                <b>Personal Details</b>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
              >
                <CustomTextField
                  name="jobTitle"
                  fullWidth
                  variant="outlined"
                  label="Job title"
                  placeholder="Senior Java/ Frontend / QA Engineer"
                  className={classes.formField}
                />
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
              >
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  className={classes.formField}
                  name="email"
                />
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
              >
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  label="First Name"
                  className={classes.formField}
                  name="firstName"
                />
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
              >
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  label="Last Name"
                  className={classes.formField}
                  name="lastName"
                />
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
              >
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  label="Skype"
                  className={classes.formField}
                  name="skype"
                />
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
              >
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  label="Phone"
                  className={classes.formField}
                  name="phone"
                />
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
              >
                <MemoDatePicker utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.formField}
                    margin="normal"
                    id="dateOfBirth"
                    label="Birthday"
                    format="MM/dd/yyyy"
                    value={values?.dateOfBirth}
                    onChange={(value) => setFieldValue('dateOfBirth', value)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MemoDatePicker>
              </Grid>

              {/* professional summary */}
              <Grid
                item
                component={Typography}
                className={classes.formSection}
                variant="h6"
                xs={12}
              >
                <b>Professional summary</b>
              </Grid>

              <Grid
                item
                xs={12}
              >
                <CustomTextField
                  fullWidth
                  multiline
                  variant="outlined"
                  name="professionalSummary"
                  placeholder="Please write 5-8 sentences explaining your general experience: years of experience, core technologies in which you are expert, methodologies (like Scrum) with which you are familiar etc."
                  rows={10}
                  className={classes.formField}
                />
              </Grid>

              {/* skills and abilities */}
              <Grid
                item
                component={Typography}
                className={classes.formSection}
                variant="h6"
                xs={12}
              >
                <b>Skills & Abilities</b>
              </Grid>

              {skills.map(({ id, label }) => (
                <Grid
                  key={id}
                  item
                  xs={12}
                >
                  <CustomAutocomplete
                    placeholder="Add item"
                    label={label}
                    name={id}
                    value={values[id]}
                    onChange={(_: any, value: any) => setFieldValue(id, value)}
                  />
                </Grid>
              ))}

              {/* education */}
              <Grid
                item
                component={Typography}
                className={classes.formSection}
                variant="h6"
                xs={12}
              >
                <b>Education</b>
              </Grid>

              <AddSection
                list={values?.education}
                render={(item, index) => (
                  <Grid
                    item
                    xs={12}
                    key={index}
                  >
                    <Grid
                      container
                      spacing={2}
                    >
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <CustomTextField
                          fullWidth
                          variant="outlined"
                          label="Education"
                          placeholder="University name"
                          className={classes.formField}
                          name={`education.${index}.school`}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <CustomTextField
                          fullWidth
                          variant="outlined"
                          label="Degree and Faculty"
                          placeholder="Master's degree in Computer Science"
                          className={classes.formField}
                          name={`education.${index}.degree`}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <MemoDatePicker utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            label="Start date"
                            format="yyyy"
                            className={classes.formField}
                            id={`education.${index}.educationStartDate`}
                            value={values.education[index].educationStartDate}
                            onChange={(value) =>
                              setFieldValue(
                                `education[${index}].educationStartDate`,
                                value
                              )}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                        </MemoDatePicker>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <MemoDatePicker utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            label="End date"
                            format="yyyy"
                            className={classes.formField}
                            id={`education.${index}.educationEndDate`}
                            value={values.education[index].educationEndDate}
                            onChange={(value) =>
                              setFieldValue(
                                `education[${index}].educationEndDate`,
                                value
                              )}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                        </MemoDatePicker>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                {...handleSectionActions('education', new EducationEntity())}
              />

              {/* social links */}
              <Grid
                item
                component={Typography}
                className={classes.formSection}
                variant="h6"
                xs={12}
              >
                <b>Social links</b>

                <FormHelperText>
                  Please specify your Bitbucket or Github account with non commercial code that can be shared with client.
                </FormHelperText>
              </Grid>

              <Grid
                item
                xs={12}
                component={AddSection}
                numberOfRequired={0}
                list={values?.socialLinks}
                render={(item: any, index: number) => (
                  <Grid
                    container
                    spacing={2}
                  >
                    <Grid
                      item
                      xs={12}
                      lg={6}
                    >
                      <CustomSelect
                        variant="outlined"
                        label="Label"
                        name={`socialLinks.${index}.label`}
                        list={socialLinksList}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      lg={6}
                    >
                      <CustomTextField
                        fullWidth
                        variant="outlined"
                        label="Link"
                        name={`socialLinks.${index}.link`}
                      />
                    </Grid>
                  </Grid>
                )}
                {...handleSectionActions(
                  'socialLinks',
                  new SocialLinksEntity()
                )}
              />

              {/* certifications */}
              <Grid
                item
                component={Typography}
                className={classes.formSection}
                variant="h6"
                xs={12}
              >
                <b>Certifications</b>
              </Grid>

              <CustomTextField
                fullWidth
                variant="outlined"
                label="Certifications"
                name="certifications"
                multiline
                rows={5}
              />

              {/* languages */}
              <Grid
                item
                component={Typography}
                className={classes.formSection}
                variant="h6"
                xs={12}
              >
                <b>Languages</b>
              </Grid>

              <Grid
                item
                xs={12}
                component={AddSection}
                list={values?.languages}
                render={(item: any, index: number) => (
                  <Grid
                    container
                    spacing={2}
                  >
                    <Grid
                      item
                      xs={12}
                      md={6}
                    >
                      <CustomTextField
                        fullWidth
                        variant="outlined"
                        label="Language"
                        name={`languages.${index}.language`}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={3}
                    >
                      <CustomSelect
                        variant="outlined"
                        label="Spoken"
                        name={`languages.${index}.spoken`}
                        list={levels}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={3}
                    >
                      <CustomSelect
                        variant="outlined"
                        label="Written"
                        name={`languages.${index}.written`}
                        list={levels}
                      />
                    </Grid>
                  </Grid>
                )}
                {...handleSectionActions('languages', new LanguageEntity())}
              />

              {/* hobby */}
              <Grid
                item
                component={Typography}
                className={classes.formSection}
                variant="h6"
                xs={12}
              >
                <b>Hobby</b>
              </Grid>

              <Grid
                item
                xs={12}
              >
                <CustomTextField
                  fullWidth
                  multiline
                  rows={5}
                  variant="outlined"
                  label="Hobby"
                  className={classes.formField}
                  name="hobby"
                />
              </Grid>

              {/* project experience */}
              <Grid
                item
                component={Typography}
                className={classes.formSection}
                variant="h6"
                xs={12}
              >
                <b>Project Experience</b>
              </Grid>

              <AddSection
                list={values?.projects}
                render={(item, index) => (
                  <Grid
                    item
                    xs={12}
                    key={index}
                  >
                    <Grid
                      container
                      spacing={2}
                    >
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <CustomTextField
                          fullWidth
                          variant="outlined"
                          label="Name"
                          className={classes.formField}
                          name={`projects.${index}.name`}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <CustomTextField
                          fullWidth
                          variant="outlined"
                          label="Country"
                          className={classes.formField}
                          name={`projects.${index}.country`}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <MemoDatePicker utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            label="Start date"
                            format="MM/yyyy"
                            className={classes.formField}
                            id={`projects.${index}.projectStartDate`}
                            value={values.projects[index].projectStartDate}
                            onChange={(value) =>
                              setFieldValue(
                                `projects[${index}].projectStartDate`,
                                value
                              )}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                        </MemoDatePicker>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <MemoDatePicker utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            label="End date"
                            format="MM/yyyy"
                            className={classes.formField}
                            id={`projects.${index}.projectEndDate`}
                            value={values.projects[index].projectEndDate}
                            onChange={(value) =>
                              setFieldValue(
                                `projects[${index}].projectEndDate`,
                                value
                              )}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                        </MemoDatePicker>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <CustomTextField
                          fullWidth
                          variant="outlined"
                          label="Position"
                          className={classes.formField}
                          name={`projects.${index}.position`}
                          value={values.projects[index].position}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={12}
                      >
                        <CustomTextField
                          fullWidth
                          multiline
                          rows={10}
                          variant="outlined"
                          label="Responsibilities"
                          placeholder="Please describe which task you was working on. Also describe complex tasks on the project if there were any. For example: implemented real time chat using websocket technology etc."
                          className={classes.formField}
                          name={`projects.${index}.responsibilities`}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                      >
                        <CustomTextField
                          fullWidth
                          multiline
                          variant="outlined"
                          rows={10}
                          label="Project description"
                          className={classes.formField}
                          name={`projects.${index}.projectDescription`}
                          helperText="Please add projects starting from latest to oldest"
                          placeholder="Please write 5-8 sentences about this project. What project is doing, to which industry it is related. What was the team size. Under which methodology you was working. What was your responsibilities on the project. Which complex components you developed."
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                      >
                        <CustomAutocomplete
                          label="Tools & Technologies"
                          placeholder="add tool"
                          name={`projects[${index}].tools`}
                          value={values.projects[index].tools}
                          onChange={(_: any, value: any) =>
                            setFieldValue(`projects[${index}].tools`, value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                {...handleSectionActions('projects', new ProjectEntity())}
              />

              <Grid
                item
                xs={12}
                style={{ textAlign: 'right' }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

export default CVForm;
