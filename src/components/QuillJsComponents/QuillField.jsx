/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// src/components/QuillField.jsx
import { forwardRef, useEffect, useRef, useLayoutEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedContent } from '../../app/index';

const QuillField = forwardRef(
  (
    {
      defaultValue = '',
      onTextChange,
      onSelectionChange,
      defaultStyles = null,
    },
    ref
  ) => {
    const containerRef = useRef(null);
    const quillInstanceRef = useRef(null);
    const initializedRef = useRef(false);
    const defaultsRef = useRef({ value: defaultValue, styles: defaultStyles });
    const dispatch = useDispatch();
    const editorState = useSelector(
      (state) => state.ResumeEditorAndChatCrontrol.editorState
    );
    // Update event handlers to avoid stale closures
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    }, [onTextChange, onSelectionChange]);

    useEffect(() => {
      if (containerRef.current && !quillInstanceRef.current) {
        const quill = new Quill(containerRef.current, {
          theme: 'bubble',
          modules: {
            toolbar: false,
            history: {
              delay: 1000,
              maxStack: 100,
              userOnly: true,
            },
          },
          formats: [
            'bold',
            'italic',
            'underline',
            'strike',
            'list',
            'align',
            'background',
            'color',
          ],
        });

        // Set initial content and styles
        if (!initializedRef.current) {
          if (defaultsRef?.current?.value) {
            quill.setText(defaultsRef.current.value);
          }
        }
        if (defaultsRef?.current?.styles) {
          Object.entries(defaultsRef.current.styles).forEach(([key, value]) => {
            quill.format(key, value);
          });
          initializedRef.current = true;
        }

        quillInstanceRef.current = quill;
        if (ref && typeof ref === 'object') {
          ref.current = quill;
        }

        quill.on('text-change', () => {
          if (onTextChangeRef.current) {
            let text = quill.getText();
            text = text.replace(/\n/g, ' ');
            onTextChangeRef.current(text);
          }
        });

        quill.on('selection-change', (range) => {
          if (range) {
            console.log(range);
            const selectedContent = quill.getContents(
              range.index,
              range.length
            );
            dispatch(
              setSelectedContent(JSON.parse(JSON.stringify(selectedContent)))
            );
          }
          if (onSelectionChangeRef.current) {
            onSelectionChangeRef.current(range, quill);
          }
        });

        if (editorState !== 'EDITING') {
          console.log(editorState);

          quill.disable(); // Disable editing
        } else {
          quill.enable(); // Enable editing
        }
      }

      return () => {
        if (quillInstanceRef.current) {
          quillInstanceRef.current.off('text-change');
          quillInstanceRef.current.off('selection-change');
          quillInstanceRef.current = null;
          if (ref && typeof ref === 'object') {
            ref.current = null;
          }
        }
      };
    }, [ref, dispatch, editorState]);

    return (
      <div
        ref={containerRef}
        className="!w-[inherit] !h-[inherit] !outline-none !border-none p-0 m-0"
      ></div>
    );
  }
);

export default QuillField;
